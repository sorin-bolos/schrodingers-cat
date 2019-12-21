import { LevelBase } from "../LevelBase";
import { Ket, Plus, Zero, One } from '../../quantum/ket';

export class Level4 extends LevelBase
{
    create(){
        const initialState = new Ket([1/Math.sqrt(2), "0.5 + 0.5i"]);
        super.create();

        // level floor
        this.addPlatform(-10, 5, 21);

        // additional platforms
        this.addPlatform(-8, 3, 16);
        this.addPlatform(-7, 1, 16);
        this.addPlatform(-8, -1, 16);
        this.addPlatform(-8, -5, 17);

        // walls 
        this.addPlatform(-9, -5, 1, 10);
        this.addPlatform(-10, -5, 1, 10);
        this.addPlatform(9, -5, 1, 10);
        this.addPlatform(10, -5, 1, 10);
        
        this.addCat(-1,0,initialState);
        this.addGateT(-8,4);
        this.addGateX(0,4);
        this.addGateH(-7,-3);
        this.addGateS(3,-3);
        this.addGateX(0,-3);

        //TSH
    }
}