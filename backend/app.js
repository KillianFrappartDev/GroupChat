require('dotenv').config();

const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');

// Local Imports
const usersRoute = require('./routes/users-route');
const groupsRoute = require('./routes/groups-route');
const messagesRoute = require('./routes/messages-route');
const bugsRoute = require('./routes/bugs-route');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', usersRoute);
app.use('/api/groups', groupsRoute);
app.use('/api/messages', messagesRoute);
app.use('/api/bugs', bugsRoute);

// Error Handler
app.use((error, req, res, next) => {
  console.log('An error occured:', error);
  res.json({ message: error.message || 'An unknown error occured.', error: true });
});

// Socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);

class User {
  constructor(uid, sid) {
    this.uid = uid;
    this.sid = sid;
    this.gid;
  }
}

let userList = [];

// Establish a connection
io.on('connection', socket => {
  // New user
  socket.on('new user', uid => {
    userList.push(new User(uid, socket.id));
  });

  // Join group
  socket.on('join group', (uid, gid) => {
    for (let i = 0; i < userList.length; i++) {
      if (socket.id === userList[i].sid) userList[i].gid = gid;
    }
  });

  // New group
  socket.on('create group', (uid, title) => {
    io.emit('fetch group');
  });

  // New message
  socket.on('message', (uid, gid) => {
    for (const user of userList) {
      if (gid === user.gid) io.to(user.sid).emit('fetch messages', gid);
    }
  });

  // Close connection
  socket.on('disconnect', () => {
    for (let i = 0; i < userList.length; i++) {
      if (socket.id === userList[i].sid) userList.splice(i, 1);
    }
  });
});

// Connect to DB && Start server
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    server.listen(process.env.PORT || 5000, () =>
      console.log(`Server up and running on port ${process.env.PORT || 5000}!`)
    );
  })
  .catch(error => console.log('Could not start server: ', error));
