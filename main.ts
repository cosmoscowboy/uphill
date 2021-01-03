namespace SpriteKind {
    export const UphillSlope = SpriteKind.create()
    export const Ground = SpriteKind.create()
    export const DownhillSlope = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(jumping)) {
        jumping = true
        princess.vy = -200
    }
})
function moveSlopes () {
    slopeSpeedX = 0
    slopeSpeedY = 0
    for (let value of sprites.allOfKind(SpriteKind.UphillSlope)) {
        value.vx = 0
        value.vy = 0
    }
    for (let value of sprites.allOfKind(SpriteKind.Ground)) {
        value.vx = 0
        value.vy = 0
    }
    for (let value of sprites.allOfKind(SpriteKind.DownhillSlope)) {
        value.vx = 0
        value.vy = 0
    }
    if (princess.right >= moveSlopesAfterPlayerPast) {
        princess.right = moveSlopesAfterPlayerPast
        if (princess.vx > 0) {
            slopeSpeedX = playerSpeed * -1
            if (onUphillSlope) {
                slopeSpeedY = tileHeightWidthRatio * Math.abs(slopeSpeedX)
            } else if (onDownhillSlope) {
                slopeSpeedY = tileHeightWidthRatio * slopeSpeedX
            } else {
                slopeSpeedY = 0
            }
            for (let value of uphillTiles) {
                value.vx = slopeSpeedX
                value.vy = slopeSpeedY
            }
            for (let value of groundTiles) {
                value.vx = slopeSpeedX
                value.vy = slopeSpeedY
            }
            for (let value of downhillTiles) {
                value.vx = slopeSpeedX
                value.vy = slopeSpeedY
            }
        }
    }
}
function checkSlopePieces () {
    for (let value2 of sprites.allOfKind(SpriteKind.UphillSlope)) {
        if (value2.right < 0) {
            uphillTiles.removeAt(uphillTiles.indexOf(value2))
            value2.destroy()
        }
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Ground)) {
        if (value2.right < 0) {
            groundTiles.removeAt(groundTiles.indexOf(value2))
            value2.destroy()
        }
    }
    for (let value2 of sprites.allOfKind(SpriteKind.DownhillSlope)) {
        if (value2.right < 0) {
            downhillTiles.removeAt(downhillTiles.indexOf(value2))
            value2.destroy()
        }
    }
}
function checkPlayerOnGround () {
    onUphillSlope = false
    onGround = false
    onDownhillSlope = false
    for (let value3 of sprites.allOfKind(SpriteKind.UphillSlope)) {
        if (princess.overlapsWith(value3)) {
            onUphillSlope = true
            jumping = false
            princess.y += raisePlayer
            princess.vy = 0
            princess.ay = 0
            while (princess.overlapsWith(value3)) {
                princess.y += raisePlayer
            }
        }
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Ground)) {
        if (princess.overlapsWith(value3)) {
            onGround = true
            jumping = false
            princess.bottom = value3.top
            princess.ay = 0
            princess.vy = 0
            while (princess.overlapsWith(value3)) {
                princess.bottom = value3.top
            }
        }
    }
    for (let value3 of sprites.allOfKind(SpriteKind.DownhillSlope)) {
        if (princess.overlapsWith(value3)) {
            onDownhillSlope = true
            jumping = false
            princess.y += raisePlayer
            princess.ay = 0
            princess.vy = 0
            while (princess.overlapsWith(value3)) {
                princess.y += raisePlayer
            }
        }
    }
    if (princess.vx == 0 && !(jumping) || onGround) {
        princess.vy = 0
        princess.ay = 0
    } else {
        princess.ay = gravity
    }
    princess.say("" + princess.bottom)
}
let slopeSpeedY = 0
let slopeSpeedX = 0
let princess: Sprite = null
let downhillTile: Sprite = null
let uphillTile: Sprite = null
let groundTile: Sprite = null
let downhillTiles: Sprite[] = []
let groundTiles: Sprite[] = []
let uphillTiles: Sprite[] = []
let onDownhillSlope = false
let onGround = false
let onUphillSlope = false
let jumping = false
let raisePlayer = 0
let tileHeightWidthRatio = 0
let playerSpeed = 0
let moveSlopesAfterPlayerPast = 0
let gravity = 0
game.splash("Press B to jump.")
gravity = 400
let slopeWidth = 16
let slopeHeight = 5
moveSlopesAfterPlayerPast = scene.screenWidth() * 0.45
playerSpeed = 100
tileHeightWidthRatio = slopeHeight / slopeWidth
let tileWidthHeightRatio = slopeWidth / slopeHeight
raisePlayer = tileHeightWidthRatio * -1 * 2
jumping = true
onUphillSlope = false
onGround = false
onDownhillSlope = false
let uphillImage = img`
    ..............22
    ..........222222
    ......2222222222
    ..22222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    `
let groundImage = img`
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    `
let downhillImage = img`
    22..............
    222222..........
    2222222222......
    22222222222222..
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    `
let totalTilesWide = scene.screenWidth() / slopeWidth
uphillTiles = []
groundTiles = []
downhillTiles = []
let lastRight = slopeWidth
let lastTop = scene.screenHeight() - slopeHeight
for (let index2 = 0; index2 <= totalTilesWide / 1; index2++) {
    groundTile = sprites.create(groundImage, SpriteKind.Ground)
    groundTile.right = lastRight
    groundTile.top = lastTop
    lastRight = lastRight + slopeWidth
    groundTiles.push(groundTile)
}
lastTop = lastTop - slopeHeight
for (let index2 = 0; index2 <= totalTilesWide * 3; index2++) {
    uphillTile = sprites.create(uphillImage, SpriteKind.UphillSlope)
    uphillTile.right = lastRight
    uphillTile.top = lastTop
    lastRight = lastRight + slopeWidth
    uphillTiles.push(uphillTile)
    lastTop = lastTop - slopeHeight
}
lastTop = lastTop + slopeHeight
for (let index2 = 0; index2 <= totalTilesWide / 1; index2++) {
    groundTile = sprites.create(groundImage, SpriteKind.Ground)
    groundTile.right = lastRight
    groundTile.top = lastTop
    lastRight = lastRight + slopeWidth
    groundTiles.push(groundTile)
}
for (let index2 = 0; index2 <= totalTilesWide * 3; index2++) {
    downhillTile = sprites.create(downhillImage, SpriteKind.DownhillSlope)
    downhillTile.right = lastRight
    downhillTile.top = lastTop
    lastRight = lastRight + slopeWidth
    lastTop = lastTop + slopeHeight
    downhillTiles.push(downhillTile)
}
for (let index2 = 0; index2 <= totalTilesWide / 1; index2++) {
    groundTile = sprites.create(groundImage, SpriteKind.Ground)
    groundTile.right = lastRight
    groundTile.top = lastTop
    lastRight = lastRight + slopeWidth
    groundTiles.push(groundTile)
}
princess = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f 4 4 f . . . 
    . . . . f f b f 5 4 5 5 4 f . . 
    . . . f b 3 3 e 4 5 5 5 5 f . . 
    . . f b 3 3 3 3 e 4 4 4 e f . . 
    . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
    . . f 3 3 3 3 e b 3 e e 3 3 f . 
    . . f 3 3 3 3 f f e e e 3 3 f . 
    . f f b b b b f b f e e e f . . 
    . f b b b b b e 1 f 4 4 e . . . 
    . f b b b b b f 4 4 4 4 f . . . 
    . . f b b b 4 4 e d d d f . . . 
    . . . f f f 4 4 e d d d f . . . 
    . . . f b b e e b b d d d f . . 
    . . . . f b d d 1 d 1 d b f . . 
    . . . . . f f f b b f f f . . . 
    `, SpriteKind.Player)
princess.setFlag(SpriteFlag.StayInScreen, true)
princess.ay = gravity
princess.left = 0
princess.bottom = groundTiles[0].top
controller.moveSprite(princess, playerSpeed, 0)
game.onUpdate(function () {
    checkPlayerOnGround()
    moveSlopes()
    checkSlopePieces()
})
