class Particle {
    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;
    }
    update() {
        this.x -= this.speedX + this.game.speed; // Horizontal x coordinate will decrease by the amount of speed x and the game speed
        this.y -= this.speedY; // Vertical y coordinate will be affected by speed y 
        this.size *= 0.97; // For every frame the size of each particle will decrease by 5 percent
        if (this.size < 0.5) this.markedForDeletion = true;
    }
}

export class Dust extends Particle {
    constructor(game, x, y) {
        super(game);
        this.size = Math.random() * 10 + 10;
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = 'rgba(0,0,0,0.2)';
    };
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}

export class Splash extends Particle {
    constructor(game, x, y) {
        super(game);
        this.size = Math.random() * 50 + 50;
        this.x = x - this.size * 0.4;
        this.y = y - this.size * 0.5;
        this.speedX = Math.random() * 6 - 4;
        this.speedY = Math.random() * 2 + 1;
        this.gravity = 0;
        this.image = document.getElementById('fire');
    }
    update() {
        super.update();
        this.gravity += 0.1;
        this.y += this.gravity;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
}

export class Fire extends Particle {
    constructor(game, x, y) {
        super(game);
        this.image = document.getElementById('fire');
        this.size = Math.random() * 50 + 50;
        this.x = x;
        this.y = y;
        this.speedX = 1;
        this.speedY = 1;
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1; // Velocity of angle is a random value between 0.1 and plus
    }
    update() {
        super.update();
        this.angle += this.va;
        this.x += Math.sin(this.angle * 5);
    }
    draw(context) {
        context.save(); // Wrap with save and restore to make sure the rotations don't overflow to other elements and only affect this fire particle 
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size); // this size as width, this size at height
        context.restore();
    }
}