import express from "express";
import { Server } from "socket.io";
import http from 'http';

const app = express();
const PORT = 5050;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:8080"],
    methods: ["GET", "POST"],
  },
});

server.listen(PORT, () => {
  console.log('Server Listening on PORT: ' + PORT);
})

io.on("connection", socket => {
  io.emit('new-user', socket.id);

  socket.on('send-message', (message, room) => {
    if(room === '' || room == undefined) {
      console.log('brodcast');
      socket.broadcast.emit('new-message', message);
    }
    else {
      console.log('room');
      socket.to(room).emit('new-message', message);
    }
  })

  socket.on('join-room', (room) => {
    socket.join(room);
    console.log(socket.id);
    io.to(socket.id).emit('joined-room', room);
  });
});

