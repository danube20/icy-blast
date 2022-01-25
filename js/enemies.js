class Enemy {
    constructor(ctx, posX, posY, gameSize) {
        this.ctx = ctx
        this.gameSize = gameSize
        this.enemyPos = { x: posX, y: posY }
        this.enemySize = { w: 30, h: 30 }
        this.health = 50

        this.init()
    }

    init() {
        this.draw()
    }
    draw() {
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.enemyPos.x, this.enemyPos.y, this.enemySize.w, this.enemySize.h)
    }
}