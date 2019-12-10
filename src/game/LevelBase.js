import Phaser from 'phaser';
import { preloadGameAssets, createGameAnimations, boxSprite, catSprite, catLeftAnim, catRightAnim, catIdleAnim } from './assets';

export class LevelBase extends Phaser.Scene {

    addPlatform(x, y, endX) {
        for (let i = x; i <= endX; i += 50) {
            this.boxes.create(i, y, boxSprite);
        }
    }    

    addCat(x,y){
        const cat = this.physics.add.sprite(x, y, catSprite);
        cat.setBounce(0.2);
        cat.setCollideWorldBounds(true);
        cat.play(catIdleAnim);
        this.physics.add.collider(cat, this.boxes);
        this.physics.add.collider(cat, this.cats);
        this.cats.push(cat);
    }

    preload() {
        preloadGameAssets(this.load);
    }

    create() {
        createGameAnimations(this.anims);
        this.cats = [];
        this.catControlIndex = 0;

        // static objects that don't move
        this.boxes = this.physics.add.staticGroup();
        
        this.physics.world.gravity.set(0,500);

        //  arrow keys input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.catControlIndex++;
            if (this.catControlIndex >= this.cats.length){
                this.catControlIndex = 0;
            }
        }
        for(let i=0; i<this.cats.length; i++){
            const cat = this.cats[i];
            i == this.catControlIndex 
                ? this._updateControlledCat(cat)
                : this._updatePassiveCat(cat);
        }
    }

    _updateControlledCat(cat){
        if (this.cursors.left.isDown) {
            cat.setVelocityX(-160);
            cat.anims.play(catLeftAnim, true);
        }
        else if (this.cursors.right.isDown) {
            cat.setVelocityX(160);
            cat.anims.play(catRightAnim, true);
        }
        else {
            cat.setVelocityX(0);
            cat.play(catIdleAnim);
        }
        if (this.cursors.up.isDown && cat.body.touching.down) {
            cat.setVelocityY(-330);
        }
    }

    _updatePassiveCat(cat){
        if (cat.body.touching.down){
            cat.setVelocityX(0);
            cat.play(catIdleAnim);
        }
    }
}

