const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = .1

class Player {
    constructor(){

        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 40
        this.height = 50
        this.attackBox = {
            position : this.position,
            width: 100,
            height: 50
        }
    }

    draw() {
        c.fillRect(
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
            )

            //attackbox
            c.fillStyle = 'red'
            c.fillRect(this.attackBox.position.x,
                 this.attackBox.position.y,
                 this.attackBox.width,
                 this.attackBox.height)
    }


update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height +
        this.velocity.y <= canvas.height)
    this.velocity.y += gravity
    else this.velocity.y = 0
}
}

class Platform{
    constructor() {
        this.position = {
            x: 100,
            y: 500
        }

        this.width = 200
        this.height = 20
    }

    draw () {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x,
            this.position.y, this.width,
            this.height)
    }
}

const player = new Player()

const enemy = new Player()

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

const platform = new Platform()


function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
    platform.draw()
    if (keys.right.pressed){
        player.velocity.x = 8
    } else if (keys.left.pressed) {
        player.velocity.x = -8
    } else player.velocity.x = 0

    if (player.position.y + player.height 
        <= platform.position.y && player.position.y 
        + player.height + player.velocity.y >= 
        platform.position.y && player.position.x + 
        player.width >= platform.position.x && player.position.x
        <= platform.position.x + platform.width
        ){
player.velocity.y = 0
    }
}
animate()

addEventListener('keydown', ({ keyCode }) => {

switch (keyCode) { 
    case 65:
        console.log('left')
        keys.left.pressed = true
        break

        case 83:
        console.log('down')
        break

        case 68:
            console.log('right')
        keys.right.pressed = true
            break

        case 87:
            console.log('up')
            player.velocity.y -= 5
            break
}
})
addEventListener('keyup', ({ keyCode }) => {

    switch (keyCode) { 
        case 65:
            console.log('left')
            keys.left.pressed = false
            break
    
            case 83:
            console.log('down')
            break
    
            case 68:
                console.log('right')
                keys.right.pressed = false
                break
    
            case 87:
                console.log('up')
                player.velocity.y -= 5
                break
    }
    

})

