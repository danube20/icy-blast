class Enemy {
    constructor(ctx, posX, posY, gameSize) {
        this.ctx = ctx
        this.gameSize = gameSize
        this.enemyPos = { x: posX, y: posY }
        this.enemySize = { w: 100, h: 80 }
        this.health = 100
        this.imageInstance = new Image()
        this.imageInstance.frames = 0
        this.imageInstance.framesIndex = 0

        this.init()
    }

    init() {
        this.imageInstance.src = './img/enemy_sprite.png'
        this.imageInstance.frames = 2
        this.imageInstance.framesIndex = 0
    }
    draw(framesCounter) {
        this.ctx.drawImage(
            this.imageInstance,
            this.imageInstance.framesIndex * (this.imageInstance.width / this.imageInstance.frames),
            0,
            this.imageInstance.width / this.imageInstance.frames,
            this.imageInstance.height,
            this.enemyPos.x,
            this.enemyPos.y,
            this.enemySize.w,
            this.enemySize.h
        )

        this.animate(framesCounter)
    }
    animate(framesCounter) {
        if (framesCounter % 10 == 0) {
            this.imageInstance.framesIndex++;
        }
        if (this.imageInstance.framesIndex >= this.imageInstance.frames) {
            this.imageInstance.framesIndex = 0;
        }
    }
}

class November extends Enemy {
    constructor(ctx, posX, posY, gameSize) {
        super(ctx, posX, posY, gameSize)
        this.ctx = ctx
        this.gameSize = gameSize
        this.novemberPos = { x: posX, y: posY }
        this.novemberSize = { w: 100, h: 80 }
        this.health = 20
        this.imageInstance = new Image()
        this.imageInstance.frames = 0
        this.imageInstance.framesIndex = 0

        this.init()
    }

    init() {
        this.imageInstance.src = './img/november.png'
        this.imageInstance.frames = 2
        this.imageInstance.framesIndex = 0
    }
    draw(framesCounter) {
        this.ctx.drawImage(
            this.imageInstance,
            this.imageInstance.framesIndex * (this.imageInstance.width / this.imageInstance.frames),
            0,
            this.imageInstance.width / this.imageInstance.frames,
            this.imageInstance.height,
            this.enemyPos.x,
            this.enemyPos.y,
            this.enemySize.w,
            this.enemySize.h
        )

        this.animate(framesCounter)
    }
    animate(framesCounter) {
        if (framesCounter % 10 == 0) {
            this.imageInstance.framesIndex++;
        }
        if (this.imageInstance.framesIndex >= this.imageInstance.frames) {
            this.imageInstance.framesIndex = 0;
        }
    }
}