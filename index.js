const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Oyuncu
const player = {
  x: 60,
  y: 60,
  size: 22,
  speed: 3
};

// Duvarlar (Among Us tarzı odalar)
const walls = [
  // Dış sınırlar
  {x: 0, y: 0, w: 600, h: 20},
  {x: 0, y: 380, w: 600, h: 20},
  {x: 0, y: 0, w: 20, h: 400},
  {x: 580, y: 0, w: 20, h: 400},

  // Odalar
  {x: 100, y: 80, w: 300, h: 20},
  {x: 100, y: 80, w: 20, h: 200},
  {x: 380, y: 80, w: 20, h: 200},
  {x: 100, y: 260, w: 300, h: 20},

  // Koridor
  {x: 250, y: 20, w: 20, h: 80}
];

// Klavye
const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// Çarpışma kontrolü
function isColliding(x, y) {
  return walls.some(w =>
    x < w.x + w.w &&
    x + player.size > w.x &&
    y < w.y + w.h &&
    y + player.size > w.y
  );
}

// Güncelleme
function update() {
  let nx = player.x;
  let ny = player.y;

  if (keys["ArrowUp"] || keys["w"]) ny -= player.speed;
  if (keys["ArrowDown"] || keys["s"]) ny += player.speed;
  if (keys["ArrowLeft"] || keys["a"]) nx -= player.speed;
  if (keys["ArrowRight"] || keys["d"]) nx += player.speed;

  if (!isColliding(nx, player.y)) player.x = nx;
  if (!isColliding(player.x, ny)) player.y = ny;
}

// Çizim
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Duvarlar
  ctx.fillStyle = "#555";
  walls.forEach(w => ctx.fillRect(w.x, w.y, w.w, w.h));

  // Oyuncu (Among Us karakteri gibi)
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(
    player.x + player.size / 2,
    player.y + player.size / 2,
    player.size / 2,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

// Oyun döngüsü
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
