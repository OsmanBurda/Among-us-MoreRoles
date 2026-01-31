const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(express.static(__dirname + '/'));

let players = {};
io.on('connection', (socket) => {
    // Doğuş yeri: Kafeterya orta boşluk
    players[socket.id] = { id: socket.id, x: 750, y: 300, color: 'red', name: "Osman" };
    io.emit('currentPlayers', players);
    socket.on('playerMovement', (data) => {
        if (players[socket.id]) { 
            players[socket.id].x = data.x; 
            players[socket.id].y = data.y;
            socket.broadcast.emit('playerMoved', players[socket.id]); 
        }
    });
    socket.on('disconnect', () => { delete players[socket.id]; io.emit('playerDisconnected', socket.id); });
});
http.listen(process.env.PORT || 3000);
