const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

const PORT = process.env.PORT || 3000;

// static site
app.use(express.static("public"));

// oyuncular
const players = {};

// socket
io.on("connection", socket => {
  players[socket.id] = {
    x: 60,
    y: 60,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`
  };

  socket.emit("init", {
    id: socket.id,
    players
  });

  socket.broadcast.emit("player-join", {
    id: socket.id,
    player: players[socket.id]
  });

  socket.on("move", data => {
    if (!players[socket.id]) return;

    players[socket.id].x = data.x;
    players[socket.id].y = data.y;

    socket.broadcast.emit("player-move", {
      id: socket.id,
      x: data.x,
      y: data.y
    });
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("player-leave", socket.id);
  });
});

http.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
