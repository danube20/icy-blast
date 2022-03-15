class Platform {
    constructor(ctx, gameSize, posY, sizeH, imgSrc) {
        this.ctx = ctx
        this.platformPos = { x: undefined, y: posY }
        this.platformVel = { x: 1.5, y: 0 }
        this.gameSize = gameSize
        this.platformSize = { w: 100, h: sizeH }
        this.randomX = 0
        this.imageInstance = new Image()
        this.imageInstance.src = imgSrc
        this.init()
    }
    init() {
        this.randomPosX()
    }
    draw() {
        this.ctx.drawImage(this.imageInstance, this.platformPos.x, this.platformPos.y, this.platformSize.w, this.platformSize.h)
    }
    randomPosX() {
        this.platformPos.x = Math.random() * (420 - 0)
        this.randomX = this.platformPos.x
    }
}

class FirstPlatform extends Platform {
    constructor(posX, ctx, gameSize, posY, sizeH, imgSrc) {
        super(ctx, gameSize, posY, sizeH, imgSrc)
        this.platformPos = { x: posX, y: posY }
    }
}

class MovingPlatform extends Platform {
    constructor(ctx, gameSize, posY, sizeH, imgSrc) {
        super(ctx, gameSize, posY, sizeH, imgSrc)
    }
    move() {
        this.checkColission()
        this.platformPos.x += this.platformVel.x
    }
    checkColission() {
        if (this.platformPos.x + this.platformSize.w > this.gameSize.w || this.platformPos.x < 0) this.platformVel.x *= -1
    }
}

class PowerUpPlatform extends Platform {
    constructor(ctx, gameSize, posY, sizeH, imgSrc) {
        super(ctx, gameSize, posY, sizeH, imgSrc)
    }
}

class BreakingPlatform extends Platform {
    constructor(ctx, gameSize, posY, sizeH, imgSrc) {
        super(ctx, gameSize, posY, sizeH, imgSrc)
        this.bPlatformVel = { x: 0, y: 0 }
        this.bPlatformPhysics = { gravity: 2.6 }
    }

    break() {
        this.bPlatformVel.y += this.bPlatformPhysics.gravity
        this.platformPos.y += this.bPlatformVel.y
    }

}