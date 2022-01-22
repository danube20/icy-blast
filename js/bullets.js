class Bullets {
    constructor(ctx, posX, posY, gameSize) {
        this.ctx = ctx
        this.bulletPos = { x: posX, y: posY }
        this.gameSize = gameSize

        this.init()
    }

    init() {
        this.move()
        this.draw()
    }
    move() {

    }
    draw() {

    }
}