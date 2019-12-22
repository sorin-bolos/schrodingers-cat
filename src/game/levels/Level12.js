import { LevelBase } from "../LevelBase";
import { Ket, Plus, Zero, One } from '../../quantum/ket';

export class Level12 extends LevelBase
{
    create(){
        const initialState = new Ket(["0.383", "-0.924i"]);
        this.name = "Level 12";

        super.create();

        // level floor
        this.addPlatform(-10, 5, 21);

        // additional platforms
        this.addPlatform(2, 2, 4);
        this.addPlatform(-3, -1, 11);
        this.addPlatform(-2, -3, 11);
        this.addPlatform(8, 1, 1);

        this.addPlatform(-5, 4, 4);
        this.addPlatform(-4, 3, 3);
        this.addPlatform(-3, 2, 2);

        // walls 
        this.addPlatform(-9, -1, 1, 10);
        this.addPlatform(-10, -1, 1, 10);
        this.addPlatform(-4, -5, 1, 5);
        this.addPlatform(9, -5, 1, 10);
        this.addPlatform(10, -5, 1, 10);
        
        this.addCat(-7,0,initialState);
        this.addGateY(-4,-1);
        this.addGateH(-5,-1);
        this.addGateZ(0,-3);
        this.addGateH(0,-9);
        this.addGateT(-2,-1);

        //HTYZH
    }
}