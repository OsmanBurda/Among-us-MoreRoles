const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Dosyaların dışarı açılması
app.use(express.static(__dirname));

// Ana sayfa yönlendirmesi
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

let players = {};

io.on('connection', (socket) => {
    console.log('Yeni oyuncu katıldı: ' + socket.id);
    
    // Rastgele başlangıç pozisyonu ve renk
    players[socket.id] = {
        x: Math.floor(Math.random() * 300) + 50,
        y: Math.floor(Math.random() * 300) + 50,
        color: "#" + Math.floor(Math.random()*16777215).toString(16),
        id: socket.id
    };

    // Mevcut oyuncuları yeni gelene gönder
    socket.emit('currentPlayers', players);
    // Yeni geleni diğerlerine bildir
    socket.broadcast.emit('newPlayer', players[socket.id]);

    // Hareket verisini al ve yay
    socket.on('playerMovement', (movementData) => {
        if (players[socket.id]) {
            players[socket.id].x = movementData.x;
            players[socket.id].y = movementData.y;
            io.emit('playerMoved', players[socket.id]);
        }
    });

    // Oyuncu çıkınca temizle
    socket.on('disconnect', () => {
        console.log('Oyuncu ayrıldı: ' + socket.id);
        delete players[socket.id];
        io.emit('playerDisconnected', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
