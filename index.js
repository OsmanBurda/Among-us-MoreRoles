const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

let players = {};

io.on('connection', (socket) => {
    console.log('Bağlantı başarılı:', socket.id);

    // Yeni oyuncuyu oluştur (Harita ortasında başlat)
    players[socket.id] = {
        x: 150,
        y: 150,
        color: "#" + Math.floor(Math.random()*16777215).toString(16),
        id: socket.id,
        name: "Osman" // Varsayılan isim
    };

    // Tüm oyuncuları yeni gelene bildir
    socket.emit('currentPlayers', players);
    
    // Yeni oyuncuyu diğerlerine bildir
    socket.broadcast.emit('newPlayer', players[socket.id]);

    // Hareket verisi senkronizasyonu
    socket.on('playerMovement', (movementData) => {
        if (players[socket.id]) {
            players[socket.id].x = movementData.x;
            players[socket.id].y = movementData.y;
            // Diğer oyunculara bu oyuncunun yerini söyle
            socket.broadcast.emit('playerMoved', players[socket.id]);
        }
    });

    socket.on('disconnect', () => {
        console.log('Oyuncu ayrıldı:', socket.id);
        delete players[socket.id];
        io.emit('playerDisconnected', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log('Among Us Sunucusu Hazır!');
});
