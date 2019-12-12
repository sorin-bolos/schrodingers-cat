import Phaser from 'phaser';
import { preloadGameAssets, createGameAnimations, boxSprite, catAtlasImage, catAnim, gateImages } from './assets';

export class LevelBase extends Phaser.Scene {

    addPlatform(x, y, endX) {
        for (let i = x; i <= endX; i += 50) {
            this.boxes.create(i, y, boxSprite);
        }
    }    

    addCat(x,y){
        const cat = this.physics.add.sprite(x, y, catAtlasImage, "cat_default");
        cat.setScale(.5,.5);
        cat.setSize(90,70);
        cat.setOffset(51,70);
        cat.setBounce(0.2);
        cat.setCollideWorldBounds(true);
        cat.play(catAnim.idle);
        this.physics.add.collider(cat, this.boxes);
        this.physics.add.collider(cat, this.cats);
        this.cats.push(cat);
    }
    
    addGateT(x,y){
        this._addGateGeneric(x, y, gateImages.T, 'T');
    }

    addGateH(x,y){
        this._addGateGeneric(x, y, gateImages.H, 'H');
    }

    _addGateGeneric(x,y,image,type){
        const gate = this.physics.add.sprite(x,y, image);
        gate.setCollideWorldBounds(true);
        gate.setScale(.5,.5);
        gate.setSize(50,50);
        this.physics.add.collider(gate, this.boxes);
        this.physics.add.overlap(gate, this.cats, (gate, cat) => this._collectGate(gate, type), null, this);
    }

    _collectGate(gate, type){
        gate.disableBody(true, true);
        this.collectedGates.push({
            gate: type,
            params: [this.catControlIndex],
        });
    }

    preload() {
        preloadGameAssets(this.load);
    }

    create() {
        createGameAnimations(this.anims);
        this.cats = [];
        this.collectedGates = [];
        this.catControlIndex = 0;

        // static objects that don't move
        this.boxes = this.physics.add.staticGroup();
        
        this.physics.world.gravity.set(0,500);

        //  arrow keys input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        console.log(this);
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
        const catSpeed = 300;
        const catJumpStrength = 330;
        const grounded = cat.body.touching.down;
        let moving = false;

        if (this.cursors.left.isDown) {
            cat.setVelocityX(-catSpeed);
            cat.setFlipX(true);
            moving = true;
        }
        else if (this.cursors.right.isDown) {
            cat.setVelocityX(+catSpeed);
            cat.setFlipX(false);
            moving = true;
        }
        else {
            cat.setVelocityX(0);
        }
        if (this.cursors.up.isDown && cat.body.touching.down) {
            cat.setVelocityY(-catJumpStrength);
        }
        if (grounded){
            if (moving){
                cat.anims.play(catAnim.run, true);
            } else {
                cat.play(catAnim.idle, true);
            }
        }
        else {
            if (cat.body.velocity.y < -100){
                cat.anims.play(catAnim.jump, true);
            }
            if (cat.body.velocity.y > 100){
                cat.anims.play(catAnim.fall);
            }
        }
    }

    _updatePassiveCat(cat){
        if (cat.body.touching.down){
            cat.setVelocityX(0);
            cat.play(catAnim.idle);
        }
    }
}

