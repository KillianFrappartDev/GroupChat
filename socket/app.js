const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('A user connected!');

  socket.on('message', () => {
    console.log('New message');
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected!');
  });
});

server.listen(process.env.PORT || 4000, () =>
  console.log(`Socket server running on port: ${process.env.PORT || 4000}!`)
);
