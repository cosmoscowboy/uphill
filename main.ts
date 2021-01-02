namespace SpriteKind {
    export const UphillSlope = SpriteKind.create()
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
    if (princess.right >= moveSlopesAfterPlayerPast) {
        princess.right = moveSlopesAfterPlayerPast
        if (princess.vx > 0) {
            slopeSpeedX = playerSpeed * -1
            slopeSpeedY = tileHeightWidthRatio * Math.abs(slopeSpeedX)
            for (let index = 0; index <= uphillTiles.length - 1; index++) {
                previousTile = uphillTiles[index]
                previousTile.vx = slopeSpeedX
                previousTile.vy = slopeSpeedY
                if (index + 1 < uphillTiles.length) {
                    nextUphillTile = uphillTiles[index + 1]
                    nextUphillTile.left = previousTile.right
                    nextUphillTile.bottom = previousTile.top
                }
            }
        }
    }
}
function checkSlopePieces () {
    for (let value of sprites.allOfKind(SpriteKind.UphillSlope)) {
        if (value.right < 0 && value.top > scene.screenHeight()) {
            uphillTiles.removeAt(uphillTiles.indexOf(value))
            value.destroy()
            uphillTile = sprites.create(uphillImage, SpriteKind.UphillSlope)
            uphillTile.bottom = lastBottom
            uphillTile.left = lastLeft
            uphillTiles.push(uphillTile)
        }
    }
}
function checkPlayerOnSlope () {
    onSlope = false
    for (let value of sprites.allOfKind(SpriteKind.UphillSlope)) {
        if (princess.overlapsWith(value)) {
            onSlope = true
            jumping = false
            princess.y += raisePlayer
            princess.vy = 0
        }
    }
    if (onSlope) {
        princess.say("on slope")
    } else {
        princess.say("jumping")
    }
}
let nextUphillTile: Sprite = null
let previousTile: Sprite = null
let slopeSpeedY = 0
let slopeSpeedX = 0
let princess: Sprite = null
let lastBottom = 0
let lastLeft = 0
let uphillTile: Sprite = null
let uphillTiles: Sprite[] = []
let uphillImage: Image = null
let onSlope = false
let jumping = false
let raisePlayer = 0
let tileHeightWidthRatio = 0
let playerSpeed = 0
let moveSlopesAfterPlayerPast = 0
game.splash("Press B to jump.")
let gravity = 400
let tileWidth = 16
let tileHeight = 5
moveSlopesAfterPlayerPast = 40
playerSpeed = 50
tileHeightWidthRatio = tileHeight / tileWidth
let tileWidthHeightRatio = tileWidth / tileHeight
raisePlayer = tileHeightWidthRatio * -1 * 2
jumping = false
onSlope = true
uphillImage = img`
    . . . . . . . . . . . . . . 2 2 
    . . . . . . . . . . 2 2 2 2 2 2 
    . . . . . . 2 2 2 2 2 2 2 2 2 2 
    . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    `
let totalTilesWide = scene.screenWidth() / tileWidth
uphillTiles = []
for (let index = 0; index <= totalTilesWide + (tileWidthHeightRatio + 1); index++) {
    uphillTile = sprites.create(uphillImage, SpriteKind.UphillSlope)
    lastLeft = 0 + index * tileWidth
    uphillTile.left = lastLeft
    lastBottom = scene.screenHeight() - index * tileHeight
    uphillTile.bottom = lastBottom
    uphillTiles.push(uphillTile)
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
princess.bottom = scene.screenHeight() - tileHeight
controller.moveSprite(princess, playerSpeed, 0)
game.onUpdate(function () {
    checkPlayerOnSlope()
    moveSlopes()
    checkSlopePieces()
})
