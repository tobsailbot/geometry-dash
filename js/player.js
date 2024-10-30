class Player {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.dy = 0;
        this.gravity = 0.35;
        this.jumpPower = -10;
        this.isJumping = false;
        this.rotationAngle = 0; // Ángulo de rotación
        this.rotationSpeed = 0.05; // Velocidad de rotación durante el salto
    }

    draw(ctx) {
        ctx.save(); // Guarda el estado actual del contexto

        // Traslada el contexto al centro del jugador
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

        // Rota el contexto
        ctx.rotate(this.rotationAngle);

        // Dibuja el rectángulo del jugador en la posición original
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

        ctx.restore(); // Restaura el contexto a su estado original
    }

    update() {
        if (this.isJumping) {
            this.dy += this.gravity;
            this.y += this.dy;

            // Incrementa el ángulo de rotación mientras el jugador está en el aire
            this.rotationAngle += this.rotationSpeed;

            // Verifica si el jugador ha tocado el suelo
            if (this.y + this.height > canvas.height - 60) {
                this.y = canvas.height - this.height - 60;
                this.isJumping = false;
                this.dy = 0;
                this.rotationAngle = 0; // Reinicia el ángulo de rotación al aterrizar
            }
        }
    }

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.dy = this.jumpPower;
        }
    }
}
