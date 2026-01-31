const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));

let players = {};

io.on('connection', (socket) => {
    // Yeni oyuncu girişi
    players[socket.id] = {
        x: Math.random() * 500,
        y: Math.random() * 500,
        color: "#" + Math.floor(Math.random()*16777215).toString(16),
        id: socket.id
    };

    io.emit('currentPlayers', players);

    // Hareket verisi geldiğinde
    socket.on('playerMovement', (movementData) => {
        if (players[socket.id]) {
            players[socket.id].x = movementData.x;
            players[socket.id].y = movementData.y;
            io.emit('playerMoved', players[socket.id]);
        }
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('playerDisconnected', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Sunucu ${PORT} üzerinde aktif.`);
});
