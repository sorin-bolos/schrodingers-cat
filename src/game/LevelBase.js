import Phaser from 'phaser';
import { preloadGameAssets, createGameAnimations, boxSprite, catAtlasImage, catAnim, gateImages, backgroundImageStatic, backgroundOpenAnim, backgroundSchrodinger } from './assets';

export class LevelBase extends Phaser.Scene {

    addPlatform(cell_x, cell_y, x_count = 1, y_count = 1) {
        for (let y=0; y<y_count; y++){
            for (let x=0; x<x_count; x++){
                this.platforms.create(
                    this._cellXToWorldX(cell_x + x), 
                    this._cellYToWorldY(cell_y + y), 
                    boxSprite);
            }
        }
    }    

    addCat(cell_x, cell_y){
        const cat = this.physics.add.sprite(
            this._cellXToWorldX(cell_x), 
            this._cellYToWorldY(cell_y),
            catAtlasImage, 
            "cat_default");

        cat.setScale(.5,.5);
        cat.setSize(90,70);
        cat.setOffset(51,70);
        cat.setBounce(0.2);
        cat.setCollideWorldBounds(true);
        cat.play(catAnim.idle);

        this.physics.add.collider(cat, this.platforms);
        this.physics.add.collider(cat, this.cats);
        this.cats.push(cat);
    }
    
    addGateT(x,y){
        this._addGateGeneric(x, y, gateImages.T, 'T');
    }

    addGateH(x,y){
        this._addGateGeneric(x, y, gateImages.H, 'H');
    }

    _addGateGeneric(cell_x,cell_y,image,type){
        const gate = this.physics.add.sprite(
            this._cellXToWorldX(cell_x), 
            this._cellYToWorldY(cell_y),
            image);
        gate.setCollideWorldBounds(true);
        gate.setScale(.5,.5);
        gate.setSize(50,50);
        this.physics.add.collider(gate, this.platforms);
        this.physics.add.overlap(gate, this.cats, (gate, cat) => this._collectGate(gate, type), null, this);
    }

    _collectGate(gate, type){
        if (this.boxHasBeenOpened){
            return;
        }
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

        this.boxHasBeenOpened = false;

        
        this.worldCenterX = 960/2;
        this.worldCenterY = 540/2;
        this.cellWidth = 50;
        this.cellHeight = 50;
        this.createBackground();
        // open bacgrkound after timer
        // setTimeout(() => this.openTheBox(), 1000);

        // static objects that don't move
        this.platforms = this.physics.add.staticGroup();
        
        this.physics.world.gravity.set(0,500);

        //  arrow keys input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        console.log(this);
    }

    createBackground(){
        const schrodinger = this.add.sprite(this.worldCenterX + 100, this.worldCenterY + 400, backgroundSchrodinger);
        schrodinger.setScale(.3);
        const sprite = this.add.sprite(this.worldCenterX, this.worldCenterY, backgroundImageStatic);
        sprite.setScale(.5);
        this.background = {
            sprite: sprite,
            schrodinger, schrodinger,
        };
    }

    openTheBox(){
        this.boxHasBeenOpened = true;
        this.background.sprite.play(backgroundOpenAnim);
        this.tweens.add({
            targets: this.background.schrodinger,
            scaleX: .9, 
            scaleY: .9,
            x: this.worldCenterX,
            y: this.worldCenterY+200,
            ease: 'Sine.easeInOut',
            duration: 2000,
            onComplete: () => inspect()
        });

        const inspect = () => {
            const scale = Math.random()*.2+.7;
            this.tweens.add({
                targets: this.background.schrodinger,
                scaleX: scale, 
                scaleY: scale,
                x: this.worldCenterX + Math.random()*300 - 150,
                y: this.worldCenterY+200 + Math.random()*100 - 50,
                ease: 'Sine.easeInOut',
                duration: 2000,
                onComplete: () => inspect()
            });
        }
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
            (i == this.catControlIndex && !this.boxHasBeenOpened)
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

    _cellXToWorldX(cell_x){
        return this.worldCenterX + cell_x * this.cellWidth;
    }

    _cellYToWorldY(cell_y){
        return this.worldCenterY + cell_y * this.cellHeight;
    }
}

