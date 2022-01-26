const iceBlast = {
    appName: 'Ice Blast',
    author: 'Guillermo Ávila & Andrés García',
    version: 'Beta 0.0.1',
    gameSize: { w: undefined, h: undefined },
    license: undefined,
    ctx: undefined,
    player: undefined,
    background: undefined,
    platformTypes: [1, 1, 1, 1, 1, 2, 3, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 2, 2, 1, 2, 1, 3, 1, 2, 1, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 1, 1, 1],
    platforms: [],
    platformDistance: 50,
    enemies: undefined,
    enemiesArr: [],
    bullets: undefined,
    FPS: 60,
    scorePoints: 0,
    intervalId: undefined,
    gameOverImgInstance: undefined,
    framesCounter: 0,

    init() {
        this.setContext()
        this.setSize()
        this.mainPlayer()
        this.createBullets()
        this.createBackground()
        this.drawAll()
        this.createPlatform()
        this.detectCollisions()
        this.createEnemies()
        this.enemiesClass()
        this.gameOverImgInstance = new Image()
        this.gameOverImgInstance.src = './img/gameoverbg.png'
    },

    setContext() {
        this.ctx = document.querySelector('#canvas').getContext('2d')
    },
    setSize() {
        this.gameSize = {
            w: 550,
            h: window.innerHeight - 20
        }
        document.querySelector('#canvas').setAttribute('width', this.gameSize.w)
        document.querySelector('#canvas').setAttribute('height', this.gameSize.h)
    },
    createPlatform() {
        this.platforms.push(new FirstPlatform(240, this.ctx, this.gameSize, this.gameSize.h - this.platformDistance, 20, './img/platform.png'))
        this.platformDistance += 150
        this.platformTypes.forEach((eachNumber) => {
            if (eachNumber === 1) {
                this.platforms.push(new Platform(this.ctx, this.gameSize, this.gameSize.h - this.platformDistance, 20, './img/platform.png'))
                this.platformDistance += 130
            } else if (eachNumber === 2) {
                this.platforms.push(new MovingPlatform(this.ctx, this.gameSize, this.gameSize.h - this.platformDistance, 20, './img/platform.png'))
                this.platformDistance += 150
            } else if (eachNumber === 3) {
                this.platforms.push(new PowerUpPlatform(this.ctx, this.gameSize, this.gameSize.h - this.platformDistance, 100, './img/powerUpPlatform.png'))
                this.platformDistance += 140
            }
        })
    },
    clearPlatforms() {
        this.platforms.forEach((eachPlatform, i) => {
            if (eachPlatform.platformPos.y > this.gameSize.h) {
                if (!(eachPlatform instanceof FirstPlatform)) {
                    this.platforms.splice(i, 1)
                }
            }
        })
    },
    mainPlayer() {
        this.player = new Player(this.ctx, this.gameSize.w / 2, this.gameSize.h / 2, this.gameSize.w, this.gameSize, this.platforms, this.enemiesArr)
    },
    playerFalls() {
        if (this.player.augustPos.y > 750) {
            this.gameOver()
        }
    },
    createBackground() {
        this.background = new BaseBackground(this.ctx, 0, 0, this.gameSize)
    },
    createBullets() {
        this.bullets = new Bullets(this.ctx, this.player.augustPos.x, this.player.augustPos.y, this.player.augustSize.w, this.player.augustSize.h)
    },
    createEnemies() {
        this.platforms.forEach((elm, i) => {
            if (i === 0) return
            else if (i % 4 === 0) {
                if (elm instanceof MovingPlatform) return
                else if (elm instanceof PowerUpPlatform) return
                else this.enemiesArr.push(new Enemy(this.ctx, elm.platformPos.x, elm.platformPos.y - 75, this.gameSize))
            }
        })
    },
    enemiesClass() {
        this.enemies = new Enemy(this.ctx, this.gameSize)
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },
    score() {
        // su distancia a la primera plataforma
        this.scorePoints = Math.floor((this.platforms[0].platformPos.y - this.gameSize.h + 50) / 20) //posición inicial
    },
    drawScore() {
        this.ctx.font = '30px sans-serif'
        this.ctx.fillStyle = 'white'
        if (this.scorePoints < 10) this.ctx.fillText(this.scorePoints, 267, 62)
        else if (this.scorePoints >= 10 && this.scorePoints < 100) this.ctx.fillText(this.scorePoints, 259, 62)
        else this.ctx.fillText(this.scorePoints, 249, 62)
    },
    detectCollisions() {
        this.platforms.forEach((eachPlatform) => {
            if (eachPlatform instanceof PowerUpPlatform) {
                if (this.player.augustPos.x < eachPlatform.platformPos.x + eachPlatform.platformSize.w &&
                    this.player.augustPos.x + this.player.augustSize.w > eachPlatform.platformPos.x &&
                    this.player.augustPos.y + this.player.augustSize.h < eachPlatform.platformPos.y + eachPlatform.platformSize.h &&
                    this.player.augustSize.h + this.player.augustPos.y - 80 > eachPlatform.platformPos.y) {
                    if (this.player.augustVel.y > 0) {
                        this.player.bounce(-36)
                    }
                }
            } else if (this.player.augustPos.x < eachPlatform.platformPos.x + eachPlatform.platformSize.w &&
                this.player.augustPos.x + this.player.augustSize.w > eachPlatform.platformPos.x &&
                this.player.augustPos.y + this.player.augustSize.h < eachPlatform.platformPos.y + eachPlatform.platformSize.h &&
                this.player.augustSize.h + this.player.augustPos.y > eachPlatform.platformPos.y) {
                if (this.player.augustVel.y > 0) {
                    this.player.bounce(-16)
                }
            }
        })
    },
    checkHealth() {
        this.player.bullets.forEach(elm => {
            this.enemiesArr.forEach(elm1 => {
                if (elm.bulletPos.x < elm1.enemyPos.x + elm1.enemySize.w &&
                    elm.bulletPos.x + elm.bulletSize.w - 45 > elm1.enemyPos.x &&
                    elm.bulletPos.y < elm1.enemyPos.y + elm1.enemySize.h &&
                    elm.bulletSize.h - 45 + elm.bulletPos.y > elm1.enemyPos.y) {
                    if (elm1.health > 0) {
                        elm1.health -= 5
                    }
                    if (elm1.health === 0) {
                        let id = this.enemiesArr.indexOf(elm1)
                        this.enemiesArr.splice(id, 1)
                    }
                }
            })
        })
        this.enemiesArr.forEach(elm => {
            if (elm.enemyPos.x < this.player.augustPos.x + this.player.augustSize.w &&
                elm.enemyPos.x + elm.enemySize.w > this.player.augustPos.x &&
                elm.enemyPos.y < this.player.augustPos.y + this.player.augustSize.h &&
                elm.enemySize.h + elm.enemyPos.y > this.player.augustPos.y) {
                if (this.player.health > 0) {
                    console.log('damage');
                    this.player.health -= 1.5
                }
                if (this.player.health === 0) {
                    this.gameOver()
                }
            }
        })
    },
    gameOver() {
        clearInterval(this.intervalId)
        this.ctx.drawImage(this.gameOverImgInstance, 0, 0, this.gameSize.w, this.gameSize.h)
        //score
        this.ctx.font = '20px sans-serif'
        this.ctx.fillStyle = '#3A426C'
        this.ctx.fillText('Your score:', 225, 100)
        this.ctx.font = '60px sans-serif'
        if (this.scorePoints < 10) this.ctx.fillText(this.scorePoints, 255, this.gameSize.h / 2)
        else if (this.scorePoints >= 10 && this.scorePoints < 100) this.ctx.fillText(this.scorePoints, 239, this.gameSize.h / 2)
        else this.ctx.fillText(this.scorePoints, 223, this.gameSize.h / 2)
    },
    drawAll() {
        this.intervalId = setInterval(() => {
            this.clearAll()
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.background.draw()
            this.player.draw()
            this.platforms.forEach(elm => {
                elm.draw()
                if (elm instanceof MovingPlatform) {
                    elm.move()
                }
            })
            this.enemiesArr.forEach(elm => {
                elm.draw(this.framesCounter)
            })
            this.player.clearBullets()
            this.detectCollisions()
            this.player.movement()
            this.checkHealth()
            this.score()
            this.drawScore()
            this.playerFalls()
        }, 1000 / this.FPS)
    }
}
iceBlast.init()