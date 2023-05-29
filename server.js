const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
let user = []
const io = socketio(server);
app.get('/', function (req, res) {
  res.write(`<h1>Hello socket</h1> ${PORT}`);
  res.end;
});
io.on('connection', client => {
  console.log(`⚡: ${client.id} user just connected!`);
  client.on('join', ({ id }) => {
    console.log(id, 'username')
    user.push(id)
  });
  client.on('send message', ({ text, recieverId }) => {
    const recipientSocket = io.client.get(recieverId);
    if (recipientSocket) {
      recipientSocket.emit('receive message', { text });
    }
  });
  client.on('new_message', (data) => {
    io.emit('new_message_notification', data);
  });

  client.on('disconnect', () => {
    console.log('user disconnected');
  });
});
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
