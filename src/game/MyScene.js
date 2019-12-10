import Phaser from 'phaser';

export class MyScene extends Phaser.Scene {

    constructor()
    {
        super();
        this.player = null; 
        this.boxes = null;
        this.cursors = null;
    }

    preload() {
        // this maps to files in /dist/assets
        this.load.setBaseURL('/assets');
        this.load.image('box', 'temp-box.png');
        this.load.spritesheet('cat', 'temp-cat.png', { frameWidth: 50, frameHeight: 50 });
    }

    buildPlatform(x, y, endX) {
        for (let i = x; i <= endX; i += 50) {
            this.boxes.create(i, y, 'box');
        }
    }    

    create() {
        // static objects that don't move
        this.boxes = this.physics.add.staticGroup();
        this.buildPlatform(0, 500, 800);
        this.buildPlatform(100, 300, 500);
        this.buildPlatform(600, 400, 800);

        this.physics.world.gravity.set(0,500);
        //  arrow keys input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = this.physics.add.sprite(100, 450, 'cat');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.boxes);
        this.anims.create({
            key: 'cat_left',
            frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'cat_wait',
            frames: [{ key: 'cat', frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'cat_right',
            frames: this.anims.generateFrameNumbers('cat', { start: 3, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('cat_left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('cat_right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('cat_wait');
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}

