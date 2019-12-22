import { LevelBase } from "../LevelBase";
import { Ket, Plus, Zero, One } from '../../quantum/ket';

export class Level13 extends LevelBase
{
    create(){
        const initialState = new Ket(["0.383", "0.924i"]);
        this.name = "Level 13";

        super.create();

        // level floor
        this.addPlatform(-10, 5, 21);

        // additional platforms
        this.addPlatform(-6, 3, 13);
        this.addPlatform(-4, 1, 9);
        this.addPlatform(-2, -1, 5);
        this.addPlatform(0, -3, 1);

        // walls 
        this.addPlatform(-9, -5, 1, 10);
        this.addPlatform(-10, -5, 1, 10);
        this.addPlatform(9, -5, 1, 10);
        this.addPlatform(10, -5, 1, 10);
        
        this.addCat(-1,0,initialState);
        this.addGateH(-8,-5);
        this.addGateTdag(8, -5);
        this.addGateY(4, 2);
        this.addGateH(0,-4);
        this.addGateS(-2,0);
        this.addGateSdag(2,0);
        this.addGateT(-4,2);

        //YHTdagSdagH
    }
}