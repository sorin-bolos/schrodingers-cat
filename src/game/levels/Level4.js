import { LevelBase } from "../LevelBase";
import { Ket, Plus, Zero, One } from '../../quantum/ket';
import { boxSpriteGreen } from '../assets';

export class Level4 extends LevelBase
{
    create(){
        const initialState = new Ket([1/Math.sqrt(2), "0.5 + 0.5i"]);
        this.name = "Level 4";
        super.create();

        // level floor
        this.addPlatform(-10, 5, 21, 1, boxSpriteGreen);

        // additional platforms
        this.addPlatform(-8, 3, 16, 1, boxSpriteGreen);
        this.addPlatform(-7, 1, 16, 1, boxSpriteGreen);
        this.addPlatform(-8, -1, 16, 1, boxSpriteGreen);
        //this.addPlatform(-8, -5, 17, 1, boxSpriteGreen);

        // walls 
        this.addPlatform(-9, -5, 1, 10, boxSpriteGreen);
        this.addPlatform(-10, -5, 1, 10, boxSpriteGreen);
        this.addPlatform(9, -5, 1, 10, boxSpriteGreen);
        this.addPlatform(10, -5, 1, 10, boxSpriteGreen);
        
        this.addCat(-1,0,initialState);
        this.addGateT(-8,4);
        this.addGateX(0,4);
        this.addGateH(-7,-3);
        this.addGateS(3,-3);
        this.addGateX(0,-3);

        //TSH
    }
}