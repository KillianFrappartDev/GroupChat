const server = require('http').createServer();
const io = require('socket.io')(server);

class User {
  constructor(uid, sid) {
    this.uid = uid;
    this.sid = sid;
    this.gid;
    User.count += 1;
  }

  static count = 0;
}

let userList = [];

// Establish a connection
io.on('connection', socket => {
  console.log('[USER] A user connected!');

  // New user
  socket.on('new user', uid => {
    userList.push(new User(uid, socket.id));
    console.log('User count: ', User.count);
  });

  // Join group
  socket.on('join group', (uid, gid) => {
    console.log(`[GROUP] User: ${uid} joined Group: ${gid}`);
    for (let i = 0; i < userList.length; i++) {
      if (socket.id === userList[i].sid) userList[i].gid = gid;
    }
  });

  // New group
  socket.on('create group', (uid, title) => {
    console.log(`[GROUP] User: ${uid} created Group: ${title}`);
  });

  // New message
  socket.on('message', (uid, gid) => {
    console.log(`[MESSAGE] User: ${uid} sent message in Group: ${gid}`);
    for (const user of userList) {
      if (gid === user.gid) io.to(user.sid).emit('fetch messages', gid);
    }
  });

  // Close connection
  socket.on('disconnect', () => {
    console.log('[USER] A user disconnected!');
    for (let i = 0; i < userList.length; i++) {
      if (socket.id === userList[i].sid) userList.splice(i, 1);
    }
  });
});

server.listen(process.env.PORT || 4000, () =>
  console.log(`Socket server running on port: ${process.env.PORT || 4000}!`)
);

// const http = require('http');
// const socketIo = require('socket.io');
// const server = http.createServer(app);
// const io = socketIo(server);
// app.set('socketio', io);

// const testIO = async (req, res, next) => {
//   const io = req.app.get('socketio');
//   io.on('connection', socket => {
//     socket.emit('test');
//   });
// };

// exports.testIO = testIO;
