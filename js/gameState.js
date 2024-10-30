let isGameOver = false;
const obstacles = [];
let score = 0; // Contador de obstáculos superados
let frameCount = 0;

function startGame() {
    document.getElementById('startMenu').style.display = 'none';
    isGameOver = false;
    player.y = canvas.height - player.height - 60;
    obstacles.length = 0;
    score = 0; // Contador de obstáculos superados
    frameCount = 0;
    gameLoop();
}

function restartGame() {
    document.getElementById('gameOverMenu').style.display = 'none';
    startGame();
}

function gameOver() {
    isGameOver = true;
    document.getElementById('gameOverMenu').style.display = 'block';
}
