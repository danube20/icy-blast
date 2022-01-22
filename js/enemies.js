class Enemy {
    constructor(ctx, gameSize) {
        this.ctx = ctx
        this.gameSize = gameSize
        this.enemyPos = { x: 100, y: 20 }
        this.enemySize = { w: 30, h: 30 }
        this.health = 10

        this.init()
    }

    init() {
        this.draw()
        console.log(this.health);
    }
    draw() {
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.enemyPos.x, this.enemyPos.y, this.enemySize.w, this.enemySize.h)
    }
    checkDamage() {
        let bullElmX = new Bullets().bullX()
        let bullElmY = new Bullets().bullY()
        if (bullElmX === this.enemyPos.x && bullElmY === this.enemyPos.y) {
            this.health -= 3
            console.log(this.health);
        }
        if (this.health === 0) {
            this.ctx.clearRect(this.enemyPos.x, this.enemyPos.y, this.enemySize.w, this.enemySize.h)
        }
    }
}