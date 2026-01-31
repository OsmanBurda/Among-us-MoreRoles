const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Statik dosyaları (html, css) sunucuya tanıtıyoruz
app.use(express.static(__dirname));

// Ana sayfaya girince index.html'i gönder
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

let players = {};

io.on('connection', (socket) => {
    console.log('Oyuncu bağlandı:', socket.id);
    players[socket.id] = {
        x: 100, y: 100,
        color: "#" + Math.floor(Math.random()*16777215).toString(16),
        id: socket.id
    };
    io.emit('currentPlayers', players);

    socket.on('playerMovement', (data) => {
        if (players[socket.id]) {
            players[socket.id].x = data.x;
            players[socket.id].y = data.y;
            io.emit('playerMoved', players[socket.id]);
        }
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('playerDisconnected', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log('Sunucu 3000 portunda hazır!'));
