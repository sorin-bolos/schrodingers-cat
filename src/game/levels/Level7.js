import { LevelBase } from "../LevelBase";
import { Ket, Plus, Zero, One } from '../../quantum/ket';
import { boxSpriteGreen } from '../assets';

export class Level7 extends LevelBase
{
    create(){
        const initialState = new Ket([1/Math.sqrt(2), "0.5 - 0.5i"]);
        this.name = "Level 7";

        super.create();

        // level floor
        this.addPlatform(-10, 5, 21, 1, boxSpriteGreen);

        // additional platforms
        this.addPlatform(1, 3, 10, 1, boxSpriteGreen);
        this.addPlatform(3, 1, 8, 1, boxSpriteGreen);
        this.addPlatform(5, -1, 6, 1, boxSpriteGreen);
        this.addPlatform(7, -3, 4, 1, boxSpriteGreen);
        this.addPlatform(9, -5, 2, 1, boxSpriteGreen);

        this.addPlatform(-10, 3, 10, 1, boxSpriteGreen);
        this.addPlatform(-10, 1, 8, 1, boxSpriteGreen);
        this.addPlatform(-10, -1, 6, 1, boxSpriteGreen);
        this.addPlatform(-10, -3, 4, 1, boxSpriteGreen);
        this.addPlatform(-10, -5, 2, 1, boxSpriteGreen);

        // walls 
        
        this.addCat(-1,0,initialState);
        this.addGateSdag(-8,-1);
        this.addGateX(-8, 1);
        this.addGateS(8, 1);
        this.addGateY(8, -1);
        this.addGateSdag(8, -3);
        this.addGateTdag(0,-9)
        this.addGateH(8,4);

        //SdagTdagH
    }
}