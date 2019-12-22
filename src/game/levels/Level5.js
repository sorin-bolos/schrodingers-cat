import { LevelBase } from "../LevelBase";
import { Ket, Plus, Zero, One } from '../../quantum/ket';
import { boxSpriteGreen } from '../assets';

export class Level5 extends LevelBase
{
    create(){
        const initialState = new Ket([1/Math.sqrt(2), "-0.5 + 0.5i"]);
        this.name = "Level 5";

        super.create();

        // level floor
        this.addPlatform(-10, 5, 21, 1, boxSpriteGreen);

        // additional platforms
        this.addPlatform(9, -3, 2, 9, boxSpriteGreen);
        this.addPlatform(8, -1, 1, 1, boxSpriteGreen);
        this.addPlatform(5, -3, 1, 9, boxSpriteGreen);
        this.addPlatform(1, -3, 1, 9, boxSpriteGreen);
        this.addPlatform(-3, -3, 1, 9, boxSpriteGreen);
        this.addPlatform(-4, -1, 1, 1, boxSpriteGreen);
        this.addPlatform(-4, 3, 1, 1, boxSpriteGreen);
        this.addPlatform(-7, -1, 1, 9, boxSpriteGreen);
        this.addPlatform(-6, 1, 1, 1, boxSpriteGreen);

        // walls 
        
        this.addCat(-7,-5,initialState);
        this.addGateT(-6,2);
        this.addGateS(8, -9);
        this.addGateH(6,-9);
        this.addGateX(-1,-9);

        //TH
    }
}