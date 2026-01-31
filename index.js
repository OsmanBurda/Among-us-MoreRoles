const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(express.static(__dirname + '/'));

let players = {};
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];

io.on('connection', (socket) => {
    // Haritadaki Kafeterya boşluğu (Resim ölçeğine göre)
    players[socket.id] = { 
        id: socket.id, 
        x: 800, 
        y: 350, 
        color: colors[Math.floor(Math.random() * colors.length)], 
        name: "Osman" 
    };

    io.emit('currentPlayers', players);

    socket.on('playerMovement', (data) => {
        if (players[socket.id]) { 
            players[socket.id].x = data.x; 
            players[socket.id].y = data.y;
            socket.broadcast.emit('playerMoved', players[socket.id]); 
        }
    });

    socket.on('disconnect', () => { 
        delete players[socket.id]; 
        io.emit('playerDisconnected', socket.id); 
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`Sunucu ${PORT} portunda aktif.`));
