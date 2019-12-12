import Phaser from 'phaser';
import { QiskitSimulator } from '../quantum/qiskitSimulator';
import { preloadGameAssets, createGameAnimations, boxSprite, catAtlasImage, catAnim, gateImages, backgroundImageStatic, backgroundOpenAnim, backgroundSchrodinger } from './assets';

const PRECISION = 3;

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

    addCat(cell_x, cell_y, initialState){
        const sprite = this.physics.add.sprite(
            this._cellXToWorldX(cell_x), 
            this._cellYToWorldY(cell_y),
            catAtlasImage, 
            "cat_default");
        
        sprite.setScale(.5,.5);
        sprite.setSize(90,70);
        sprite.setOffset(51,70);
        sprite.setBounce(0.2);
        sprite.setCollideWorldBounds(true);
        sprite.play(catAnim.idle);
        this.physics.add.collider(sprite, this.platforms);
        this.physics.add.collider(sprite, this.cats);

        const cat = {
            sprite,
            state: initialState,
            alive: true
        }

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
        this.physics.add.overlap(gate, this.cats.map(cat => cat.sprite), (gate, cat) => this._collectGate(gate, type), null, this);
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
        this._beginSimulate(this.cats[this.catControlIndex], type);
    }

    async _beginSimulate(cat, type){
        cat.state = await this.simulator.apply({ name: type}, cat.state);
        cat.state.amplitudes.forEach(element => {
            if (element.toPolar().r.toFixed(PRECISION) == 1)
            {
                this.openTheBox();
            }
        });
    }
    
    preload() {
        preloadGameAssets(this.load);
    }

    create() {
        this.simulator = new QiskitSimulator();

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
        this.createTimerText();
        this.createStateText();
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

    createTimerText(){
        this.timer = this.add.text(960 - 100, 5, '', { fontFamily: 'Roboto', fill: '#25FF1B' });
    }

    createStateText(){
        this.state = this.add.text(this.worldCenterX, 5, '', { fontFamily: 'Roboto', fill: '#25FF1B' });
    }

    updateStateText(first, second){
        this.state.setText(first + "|0> " + second + "|1> ");
    }

    updateTimer(timeRemainingInSeconds){
        if (timeRemainingInSeconds < 30){
            this.timer.style.setFill("#E5053B");
        }

        var minutes = Math.floor(timeRemainingInSeconds / 60);
        var seconds = timeRemainingInSeconds - minutes * 60;

        this.timer.setText(minutes + ":" + seconds);
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

        this._beginMeasure();

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

    async _beginMeasure() {
        const promises = this.cats.map(async (cat) => {
            cat.state = await this.simulator.apply({ name: "M"}, cat.state);
            if (cat.state.amplitudes[0].toPolar().r.toFixed(PRECISION) == 1)
            {
                cat.alive = false;
            }
            console.log(cat.alive ? "cat is alive" : "cat is dead");
        });

        await Promise.all(promises);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.catControlIndex++;
            if (this.catControlIndex >= this.cats.length){
                this.catControlIndex = 0;
            }
        }
        for(let i=0; i<this.cats.length; i++){
            const catSprite = this.cats[i].sprite;
            (i == this.catControlIndex && !this.boxHasBeenOpened)
                ? this._updateControlledCatSprite(catSprite)
                : this._updatePassiveCatSprite(catSprite);
        }
    }

    _updateControlledCatSprite(sprite){
        const catSpeed = 300;
        const catJumpStrength = 330;
        const grounded = sprite.body.touching.down;
        let moving = false;
        
        if (this.cursors.left.isDown) {
            sprite.setVelocityX(-catSpeed);
            sprite.setFlipX(true);
            moving = true;
        }
        else if (this.cursors.right.isDown) {
            sprite.setVelocityX(+catSpeed);
            sprite.setFlipX(false);
            moving = true;
        }
        else {
            sprite.setVelocityX(0);
        }
        if (this.cursors.up.isDown && sprite.body.touching.down) {
            sprite.setVelocityY(-catJumpStrength);
        }
        if (grounded){
            if (moving){
                sprite.anims.play(catAnim.run, true);
            } else {
                sprite.play(catAnim.idle, true);
            }
        }
        else {
            if (sprite.body.velocity.y < -100){
                sprite.anims.play(catAnim.jump, true);
            }
            if (sprite.body.velocity.y > 100){
                sprite.anims.play(catAnim.fall);
            }
        }
    }

    _updatePassiveCatSprite(sprite){
        if (sprite.body.touching.down){
            sprite.setVelocityX(0);
            sprite.play(catAnim.idle);
        }
    }

    _cellXToWorldX(cell_x){
        return this.worldCenterX + cell_x * this.cellWidth;
    }

    _cellYToWorldY(cell_y){
        return this.worldCenterY + cell_y * this.cellHeight;
    }
}

