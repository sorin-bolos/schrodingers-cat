import { LevelBase } from "../LevelBase";
import { Ket, Plus, Zero, One } from '../../quantum/ket';
import { boxSpriteGreen } from '../assets';

export class Level6 extends LevelBase
{
    create(){
        const initialState = new Ket([1/Math.sqrt(2), "-0.5 - 0.5i"]);
        this.name = "Level 6";

        super.create();

        // level floor
        this.addPlatform(-10, 5, 21, 1, boxSpriteGreen);

        // additional platforms
        this.addPlatform(1, 3, 10, 1, boxSpriteGreen);
        this.addPlatform(3, 1, 8, 1, boxSpriteGreen);
        this.addPlatform(5, -1, 6, 1, boxSpriteGreen);
        this.addPlatform(7, -3, 4, 1, boxSpriteGreen);
        this.addPlatform(9, -5, 2, 1, boxSpriteGreen);

        // walls 
        
        this.addCat(-1,0,initialState);
        this.addGateT(-8,-5);
        this.addGateSdag(9,-4);
        this.addGateH(9,4);
        this.addGateH(9,2);
        this.addGateH(9,0);
        this.addGateH(9,-2);
        this.addGateS(7, 4);
        this.addGateZ(5, 4);
        this.addGateS(3, 4);
        this.addGateS(7, 2);
        this.addGateZ(5, 2);
        this.addGateS(7, 0);
        this.addGateZ(7, -2);

        //SdagTH
    }
}