import { LevelBase } from "../LevelBase";
import { Ket, Plus, Zero, One } from '../../quantum/ket';
import { boxSpriteRed } from '../assets';

export class Level8 extends LevelBase
{
    create(){
        const initialState = new Ket(["0.924", "0 - 0.383i"]);
        this.name = "Level 8";
        super.create();

        // level floor
        this.addPlatform(-10, 5, 21, 1, boxSpriteRed);

        // additional platforms
        this.addPlatform(-1, 3, 1, 1, boxSpriteRed);
        this.addPlatform(1, 1, 2, 1, boxSpriteRed);
        this.addPlatform(-5, 0, 1, 1, boxSpriteRed);
        this.addPlatform(-8, -2, 2, 1, boxSpriteRed);
        this.addPlatform(8, -1, 1, 1, boxSpriteRed);

        // walls
        this.addPlatform(0, 1, 1, 4, boxSpriteRed);
        this.addPlatform(-6, -2, 1, 7, boxSpriteRed);
        this.addPlatform(9, -5, 1, 10, boxSpriteRed);
        
        this.addCat(-3,0,initialState);
        this.addGateH(-8,-5);
        this.addGateTdag(8,-9);
        this.addGateH(2,-9);
        this.addGateZ(-5,-3);

        //HZTdagH
    }
}