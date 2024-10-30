const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

// Instancia de Background para el fondo de montañas
const background = new Background(canvas.width, 100, 0.5); // Velocidad baja para efecto parallax


// Crear el jugador
const player = new Player(180, canvas.height - 60, 40, 40, '#5ac700');
let obstacleFrequency = 90;
let lastObstacle = 0;
const obstacleDistance = 50;

function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createObstacle() {
    // Parámetros del obstáculo
    const obstacleWidth = 20;
    const obstacleHeight = getRandomBetween(50, 100);
    const obstacleColor = '#00aaff';
    const obstacleSpeed = 4;
    obstacles.push(new Obstacle(canvas.width, canvas.height - obstacleHeight - 60, obstacleWidth, obstacleHeight, obstacleColor, obstacleSpeed));
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].update();
        obstacles[i].draw(ctx);

        if (obstacles[i].isOffScreen()) {
            obstacles.splice(i, 1);
            score++;
        }

        // Verifica colisiones con el jugador
        if (
            player.x < obstacles[i].x + obstacles[i].width &&
            player.x + player.width > obstacles[i].x &&
            player.y < obstacles[i].y + obstacles[i].height &&
            player.y + player.height > obstacles[i].y
        ) {
            gameOver();
            lastObstacle = 0;
            player.isJumping = false;
            player.rotationAngle = 0;
        }
    }
}

// Evento de salto con clic izquierdo
window.addEventListener('mousedown', (e) => {
    if (e.button === 0 && !isGameOver) {
        player.jump();
    }
});


function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Score: ${score}`, 10, 30); // Dibuja el puntaje en la esquina superior izquierda
}

function drawFloor() {
    ctx.fillStyle = '#654321'; // Color del piso, por ejemplo, marrón
    ctx.fillRect(0, canvas.height - 60, canvas.width, 60); // Dibuja el piso en la parte inferior
}

function gameLoop() {
    if (isGameOver) return;
    
    // Dibujar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar y actualizar elementos
    background.draw(ctx);
    background.update();
    drawFloor();
    player.draw(ctx);
    player.update();
    drawScore(); // Dibuja el puntaje en cada cuadro

    
    if (frameCount % obstacleFrequency === 0 && frameCount > lastObstacle + obstacleDistance) {
        createObstacle();
        obstacleFrequency = getRandomBetween(90, 120);
        lastObstacle = frameCount;
    }
    
    updateObstacles();
    frameCount++;
    requestAnimationFrame(gameLoop);
}
