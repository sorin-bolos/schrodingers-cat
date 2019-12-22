import { LevelBase } from "../LevelBase";
import { Ket, Plus, Zero, One } from '../../quantum/ket';

export class Level2 extends LevelBase
{
    create(){
        const initialState = new Ket([1/Math.sqrt(2), 1/Math.sqrt(2) + "i"]);
        this.name = "Level 2";

        super.create();

        // level floor
        this.addPlatform(-9, 5, 19);

        // additional platforms
        this.addPlatform(0, 1, 3);
        this.addPlatform(-4, 3, 3);
        this.addPlatform(-6, 1, 1);
        this.addPlatform(-8, -1, 2);
        this.addPlatform(-5, -3, 10);
        this.addPlatform(5, -1, 5);

        // walls 
        
        this.addCat(-1,0,initialState);
        this.addGateZ(-8,-5);
        this.addGateS(8,-9);
        this.addGateH(1,-2);
    }
}