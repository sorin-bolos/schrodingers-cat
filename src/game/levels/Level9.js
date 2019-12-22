import { LevelBase } from "../LevelBase";
import { Ket, Plus, Zero, One } from '../../quantum/ket';
import { boxSpriteRed } from '../assets';

export class Level9 extends LevelBase
{
    create(){
        const initialState = new Ket(["0.924", "0 + 0.383i"]);
        this.name = "Level 9";

        super.create();

        // level floor
        this.addPlatform(-10, 5, 21, 1, boxSpriteRed);

        // additional platforms
        this.addPlatform(-9, 4, 1, 1, boxSpriteRed);
        this.addPlatform(-8, 3, 1, 1, boxSpriteRed);
        this.addPlatform(-7, 2, 1, 1, boxSpriteRed);
        this.addPlatform(-6, 1, 1, 1, boxSpriteRed);
        this.addPlatform(-5, 0, 5, 1, boxSpriteRed);

        this.addPlatform(5.5, -2, 3, 1, boxSpriteRed);
        this.addPlatform(6, 2, 5, 1, boxSpriteRed);

        // walls
        
        this.addCat(-9,0,initialState);
        this.addGateH(-8,-5);
        this.addGateT(7,-9);
        this.addGateH(3,-9);
        this.addGateZ(0,0);

        //HZTH
    }
}