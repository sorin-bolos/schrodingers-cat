import { LevelBase } from "../LevelBase";
import { Ket, Plus, Zero, One } from '../../quantum/ket';
import { boxSpriteRed } from '../assets';

export class Level10 extends LevelBase
{
    create(){
        const initialState = new Ket(["0.924", "0.383"]);
        this.name = "Level 10";

        super.create();

        // level floor
        this.addPlatform(-10, 5, 21, 1, boxSpriteRed);

        // additional platforms
        this.addPlatform(-1, 3, 1, 1, boxSpriteRed);
        this.addPlatform(-6, 1, 5, 1, boxSpriteRed);
        this.addPlatform(1, 1, 5, 1, boxSpriteRed);
        
        this.addPlatform(-10, -1, 3, 1, boxSpriteRed);
        this.addPlatform(8, -1, 3, 1, boxSpriteRed);
        
        this.addPlatform(-5, -3, 11, 1, boxSpriteRed);

        // walls
        this.addPlatform(-2, 2, 1, 3, boxSpriteRed);
        this.addPlatform(1, 2, 1, 3, boxSpriteRed);
        
        this.addCat(0,0,initialState);
        this.addGateH(-8,-5);
        this.addGateS(8,-9);
        this.addGateH(0,-9);
        this.addGateZ(3,-1);
        this.addGateT(-4,-1);

        //SHTZH
    }
}