import Phaser from 'phaser';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }
        }
    },
    scene: {
        preload, init, create, update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    // this maps to files in /dist/assets
    this.load.setBaseURL('/assets');

    this.load.image('box', 'temp-box.png');
    this.load.spritesheet('cat', 'temp-cat.png', { frameWidth: 50, frameHeight: 50 });
}

export function toggleFullscreen() {
    // in fullscreen mode stretch to fill

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullscreen();
    }
    else
    {
        game.scale.startFullscreen(false);
    }
}

var player, cursors, boxes;

function init(){
    
}

function createPlatform(staticGroup, x, y, endX)
{
    for(let i=x; i<=endX; i+=50){
        staticGroup.create(i,y,'box');
    }
}

function create ()
{
    // static objects that don't move
    boxes = this.physics.add.staticGroup();

    createPlatform(boxes, 0,600,800);
    createPlatform(boxes, 100,400,500);
    createPlatform(boxes, 600,500,800);

    //  arrow keys input
    cursors = this.input.keyboard.createCursorKeys();

    player = this.physics.add.sprite(100, 450, 'cat');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, boxes);

    this.anims.create({
        key: 'cat_left',
        frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'cat_wait',
        frames: [ { key: 'cat', frame: 2 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'cat_right',
        frames: this.anims.generateFrameNumbers('cat', { start: 3, end: 4 }),
        frameRate: 10,
        repeat: -1
    });

}

function update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('cat_left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('cat_right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('cat_wait');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}