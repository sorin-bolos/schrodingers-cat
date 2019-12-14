import Phaser from 'phaser';
import { QiskitSimulator } from '../quantum/qiskitSimulator';
import { preloadGameAssets, createGameAnimations, boxSprite, catAtlasImage, catAnim, gateImages, backgroundImageStatic, backgroundOpenAnim, backgroundSchrodinger } from './assets';
import { setState } from '../sphere/sphere';

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
        this.physics.add.collider(sprite, this.cats.map(cat => cat.sprite));

        const cat = {
            sprite,
            state: initialState,
            alive: true
        }

        this.cats.push(cat);

        this._setLife(cat);
    }
    
    addGateT(x,y){
        this._addGateGeneric(x, y, gateImages.T, 'T');
    }

    addGateH(x,y){
        this._addGateGeneric(x, y, gateImages.H, 'H');
    }

    addGateX(x,y){
        this._addGateGeneric(x, y, gateImages.X, 'X');
    }

    addGateY(x,y){
        this._addGateGeneric(x, y, gateImages.Y, 'Y');
    }

    addGateZ(x,y){
        this._addGateGeneric(x, y, gateImages.Z, 'Z');
    }

    addGateS(x,y){
        this._addGateGeneric(x, y, gateImages.S, 'S');
    }

    addGateSdag(x,y){
        this._addGateGeneric(x, y, gateImages.Sdag, 'Sdg');
    }

    addGateTdag(x,y){
        this._addGateGeneric(x, y, gateImages.Tdag, 'Tdg');
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
        this._setLife(cat);
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
        this.tickCount = 0;
        this.deadline = 120*60;

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

        //DEBUG
        //setState(1*-50, 0*50, 0*-50);

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
        this.timer = this.add.text(820, 20, '', { fontFamily: 'Roboto', fill: '#2c3e50' });
        this.timer.setFontSize(25);
    }

    createStateText(){
        this.state = this.add.text(this.worldCenterX - 170, 7, '', { fontFamily: 'Roboto', fill: '#34495e' });
    }

    updateStateText(_first, _second){
        const first = _first.clone();
        const second = _second.clone();

        if (first.re)
            first.re = parseFloat(first.re).toFixed(3);
        if (first.im)
            first.im = parseFloat(first.im).toFixed(3);
        if (second.re)
            second.re = parseFloat(second.re).toFixed(3);
        if (second.im)
            second.im = parseFloat(second.im).toFixed(3);
        this.state.setText("[ " + first + " |DEAD> " +"                 "+ second + " |ALIVE> ]");
    }

    updateTimerText(timeRemainingInSeconds){
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
            this._setLife(cat);
            console.log(cat.alive ? "cat is alive" : "cat is dead");

            const endText1 = cat.alive ? "You are alive!" : "You are dead";
            const endText2 = cat.alive ? "Press space for next level" : "Press space to retry";
            let endLevelText1 = this.add.text(this.worldCenterX - 200, 200, '', 
            { fontFamily: 'Roboto', fill: '#E74C3C', textAlign: 'center', allign:'center',
             fontSize: 40});
             let endLevelText2 = this.add.text(this.worldCenterX - 250, 250, '', 
            { fontFamily: 'Roboto', fill: '#E74C3C', textAlign: 'center', allign:'center',
             fontSize: 40});
            endLevelText1.setText(endText1);
            endLevelText2.setText(endText2);
        });

        await Promise.all(promises);
    }

    update() {
        this._updateTimer();
        this._updateLevel();
        this._updateCats();
    }

    _updateTimer(){
        this.tickCount++;
        this.updateTimerText(Math.max(0,Math.round((this.deadline - this.tickCount) / 60)));
        if (this.tickCount > this.deadline && !this.boxHasBeenOpened){
            this.openTheBox();
        }
    }

    _updateLevel(){
        if (this.boxHasBeenOpened && Phaser.Input.Keyboard.JustDown(this.spacebar)){
            const firstDeadCat = this.cats.find(cat => !cat.alive);
            const allCatsAreAlive = firstDeadCat == null;
            notifyFinishLevel(allCatsAreAlive);
        }
    }

    _updateCats(){
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.catControlIndex++;
            if (this.catControlIndex >= this.cats.length){
                this.catControlIndex = 0;
            }
        }
        for(let i=0; i<this.cats.length; i++){
            const cat = this.cats[i];
            (i == this.catControlIndex && !this.boxHasBeenOpened && cat.alive)
                ? this._updateControlledCat(cat)
                : this._updatePassiveCat(cat);
        }
    }

    _updateControlledCat(cat){
        const sprite = cat.sprite;
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

    _updatePassiveCat(cat){
        const sprite = cat.sprite;
        if (sprite.body.touching.down){
            sprite.setVelocityX(0);
            sprite.play(catAnim.idle);
        }
        if (!cat.alive){
            sprite.setFlipY(true);
            sprite.setOffset(0,40);
        }
    }

    _cellXToWorldX(cell_x){
        return this.worldCenterX + cell_x * this.cellWidth;
    }

    _cellYToWorldY(cell_y){
        return this.worldCenterY + cell_y * this.cellHeight;
    }

    _setLife(cat) {
        const coordinates = cat.state.sphereCarthesianCoordinates();
        console.log(coordinates);
        setState(coordinates.x*-50, coordinates.z*50, coordinates.y*-50);

        this.updateStateText(cat.state.amplitudes[0], cat.state.amplitudes[1]);
    }
}

const levelFinishedListeners = [];

function notifyFinishLevel(allCatsAreAlive){
    levelFinishedListeners.forEach(listener => listener(allCatsAreAlive));
}

export function addLevelFinishListener(listener){
    levelFinishedListeners.push(listener);
}