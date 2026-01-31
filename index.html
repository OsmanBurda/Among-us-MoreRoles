<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Among Us - Map Update</title>
    <style>
        body { margin: 0; background: #111; overflow: hidden; touch-action: none; }
        canvas { display: block; }
    </style>
</head>
<body>
    <canvas id="game"></canvas>
    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        const canvas = document.getElementById('game');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let players = {};
        let myId;
        
        // Harita Nesneleri (Engeller)
        const obstacles = [
            { x: canvas.width/2 - 50, y: canvas.height/2 - 50, w: 100, h: 100, color: "#444", label: "MASA" }
        ];

        const joystick = {
            active: false,
            baseX: 80, baseY: canvas.height - 80,
            currX: 80, currY: canvas.height - 80,
            size: 45, stickSize: 22
        };

        socket.on('currentPlayers', (data) => { players = data; myId = socket.id; });
        socket.on('playerMoved', (p) => { players[p.id] = p; });
        socket.on('playerDisconnected', (id) => { delete players[id]; });

        // Dokunmatik ve Joystick Mantığı
        window.addEventListener("touchstart", (e) => {
            const tx = e.touches[0].clientX;
            const ty = e.touches[0].clientY;
            const dist = Math.sqrt((tx - joystick.baseX)**2 + (ty - joystick.baseY)**2);
            if (dist < 100) joystick.active = true;
        });

        window.addEventListener("touchmove", (e) => {
            if (joystick.active) {
                const tx = e.touches[0].clientX;
                const ty = e.touches[0].clientY;
                const dx = tx - joystick.baseX;
                const dy = ty - joystick.baseY;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const maxDist = joystick.size;
                if (dist > maxDist) {
                    joystick.currX = joystick.baseX + (dx / dist) * maxDist;
                    joystick.currY = joystick.baseY + (dy / dist) * maxDist;
                } else {
                    joystick.currX = tx;
                    joystick.currY = ty;
                }
            }
        });

        window.addEventListener("touchend", () => {
            joystick.active = false;
            joystick.currX = joystick.baseX;
            joystick.currY = joystick.baseY;
        });

        function checkCollision(newX, newY) {
            for (let obs of obstacles) {
                if (newX > obs.x - 15 && newX < obs.x + obs.w + 15 &&
                    newY > obs.y - 20 && newY < obs.y + obs.h + 20) {
                    return true; // Çarpışma var
                }
            }
            return false;
        }

        function update() {
            if (joystick.active && players[myId]) {
                const dx = joystick.currX - joystick.baseX;
                const dy = joystick.currY - joystick.baseY;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist > 5) {
                    const speed = 4;
                    const nextX = players[myId].x + (dx / joystick.size) * speed;
                    const nextY = players[myId].y + (dy / joystick.size) * speed;
                    
                    if (!checkCollision(nextX, nextY)) {
                        players[myId].x = nextX;
                        players[myId].y = nextY;
                        socket.emit('playerMovement', { x: players[myId].x, y: players[myId].y });
                    }
                }
            }
        }

        function drawMap() {
            // Zemin Izgarası
            ctx.strokeStyle = "#2c3e50";
            for(let i=0; i<canvas.width; i+=60) {
                ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,canvas.height); ctx.stroke();
            }
            // Masalar (Engeller)
            obstacles.forEach(obs => {
                ctx.fillStyle = obs.color;
                ctx.beginPath();
                ctx.arc(obs.x + 50, obs.y + 50, 50, 0, Math.PI*2);
                ctx.fill();
                ctx.strokeStyle = "#222";
                ctx.lineWidth = 5;
                ctx.stroke();
            });
        }

        function drawPlayer(p) {
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x - 15, p.y - 20, 30, 40);
            ctx.fillStyle = "#87CEEB";
            ctx.fillRect(p.x, p.y - 10, 15, 10);
        }

        function loop() {
            ctx.fillStyle = "#34495e"; // Uzay gemisi zemini rengi
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawMap();
            update();
            
            // Joystick çizimi
            ctx.beginPath();
            ctx.arc(joystick.baseX, joystick.baseY, joystick.size, 0, Math.PI*2);
            ctx.strokeStyle = "white"; ctx.stroke();
            ctx.beginPath();
            ctx.arc(joystick.currX, joystick.currY, joystick.stickSize, 0, Math.PI*2);
            ctx.fillStyle = "rgba(0,150,255,0.7)"; ctx.fill();

            for (let id in players) drawPlayer(players[id]);
            requestAnimationFrame(loop);
        }
        loop();
    </script>
</body>
</html>
