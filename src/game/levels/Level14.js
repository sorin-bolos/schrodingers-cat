import { LevelBase } from "../LevelBase";
import { Ket, Plus, Zero, One } from '../../quantum/ket';

export class Level14 extends LevelBase
{
    create(){
        const initialState = new Ket(["0.383", "-0.924"]);
        super.create();

        // level floor
        this.addPlatform(-10, 5, 20);

        // additional platforms
        this.addPlatform(3, 3, 4);
        this.addPlatform(-5, 1, 8);
        this.addPlatform(-9, -1, 3);
        this.addPlatform(7, -1, 3);
        this.addPlatform(-5, -3, 10);

        // walls 
        this.addPlatform(-9, -1, 1, 10);
        
        this.addCat(-1,0,initialState);
        this.addGateH(-8,-5);
        this.addGateH(0,-9);
        this.addGateS(0,0);
        this.addGateT(-2,2);
    }
}