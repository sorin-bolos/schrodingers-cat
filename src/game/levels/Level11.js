import { LevelBase } from "../LevelBase";
import { Ket, Plus, Zero, One } from '../../quantum/ket';
import { boxSpriteRed } from '../assets';

export class Level11 extends LevelBase
{
    create(){
        const initialState = new Ket(["0.924", "-0.383"]);
        this.name = "Level 11";

        super.create();

        // level floor
        this.addPlatform(-10, 5, 21, 1, boxSpriteRed);

        // additional platforms
        this.addPlatform(-4, 0, 9, 4, boxSpriteRed);
        this.addPlatform(-5, 3, 1, 1, boxSpriteRed);
        this.addPlatform(-10, 1, 2, 1, boxSpriteRed);
        this.addPlatform(9, -2, 2, 1, boxSpriteRed);
        this.addPlatform(-4, -3, 9, 1, boxSpriteRed);

        // walls
        
        this.addCat(-1, -3,initialState);
        this.addGateH(-8,-5);
        this.addGateS(8,-9);
        this.addGateH(0,-9);
        this.addGateS(1,-3);
        this.addGateT(-3,-3);

        //SHTSH
    }
}