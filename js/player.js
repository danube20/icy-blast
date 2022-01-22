class Player { // August
    constructor(ctx, posX, posY, gameSize) {
        this.ctx = ctx;
        this.augustPos = { x: posX, y: posY };
        this.gameSize = gameSize;
        this.augustVel = { x: 10, y: 1 }
        this.augustPhysics = { gravity: 1.5 }
        this.augustSize = { w: 50, h: 50 }

        this.init();
    }

    init() {
        this.draw()
        this.augustPos.y += this.augustVel.y
    }
    draw() { // Augusto
        this.ctx.fillStyle = 'Black';
        this.ctx.fillRect(this.augustPos.x, this.augustPos.y, this.augustSize.w, this.augustSize.h)
        this.physics()
    }
    moveRight() {
        this.augustPos.x += 10;
    }
    moveLeft() {
        this.augustPos.x -= 10;
    }
    physics() {
        this.augustVel.y += 2
        this.augustPos.y += this.augustVel.y
    }
    checkCollisionY() {
        if (this.augustPos.y >= this.gameSize.h - this.augustSize.h) { // bottom
            this.augustVel.y *= -1
        }

    }

}