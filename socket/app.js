const server = require('http').createServer();
const io = require('socket.io')(server);

// Establish a connection
io.on('connection', socket => {
  console.log('[USER] A user connected!');

  // Join group
  socket.on('join group', (uid, gid) => {
    console.log(`[GROUP] User: ${uid} joined Group: ${gid}`);
  });

  // New group
  socket.on('create group', (uid, title) => {
    console.log(`[GROUP] User: ${uid} created Group: ${title}`);
  });

  // New message
  socket.on('message', (uid, gid) => {
    console.log(`[MESSAGE] User: ${uid} sent message in Group: ${gid}`);
    io.emit('fetch messages', gid);
  });

  // Close connection
  socket.on('disconnect', () => {
    console.log('[USER] A user disconnected!');
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
