class Background {
    constructor(width, height, speed) {
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.triangles = this.generateTriangles();
    }

    // Genera los triángulos para simular montañas
    generateTriangles() {
        const triangles = [];
        for (let i = 0; i < 10; i++) { // Puedes ajustar la cantidad de triángulos
            const base = getRandomBetween(100, 200); // Anchura de cada triángulo
            const height = getRandomBetween(100, 200); // Altura de cada triángulo
            const x = i * 150 - Math.random() * 100; // Espaciado aleatorio para evitar uniformidad
            const y = canvas.height - 20; // Base del triángulo
            triangles.push({ x, y, base, height });
        }
        return triangles;
    }

    draw(ctx) {
        ctx.fillStyle = '#222629'; // Color gris para las montañas
        this.triangles.forEach(triangle => {
            ctx.beginPath();
            ctx.moveTo(triangle.x, triangle.y); // Punto inferior izquierdo
            ctx.lineTo(triangle.x + triangle.base / 2, triangle.y - triangle.height); // Pico de la montaña
            ctx.lineTo(triangle.x + triangle.base, triangle.y); // Punto inferior derecho
            ctx.closePath();
            ctx.fill();
        });
    }

    update() {
        // Desplaza cada triángulo hacia la izquierda
        this.triangles.forEach(triangle => {
            triangle.x -= this.speed;
        });

        // Regenera los triángulos si alguno sale de la pantalla
        if (this.triangles[0].x + this.triangles[0].base < 0) {
            this.triangles.shift(); // Elimina el primer triángulo
            // Añade un nuevo triángulo al final para mantener el efecto continuo
            const base = getRandomBetween(100, 200);
            const height = getRandomBetween(100, 200);
            const x = this.triangles[this.triangles.length - 1].x + 150;
            const y = canvas.height - 20;
            this.triangles.push({ x, y, base, height });
        }
    }
}

// Función para obtener un valor aleatorio entre min y max
function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
