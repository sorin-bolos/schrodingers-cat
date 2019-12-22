import { LevelBase } from "../LevelBase";
import { Ket, Plus, Zero, One } from '../../quantum/ket';

export class Level3 extends LevelBase
{
    create(){
        const initialState = new Ket([1/Math.sqrt(2), "-" + 1/Math.sqrt(2) + "i"]);
        this.name = "Level 3";

        super.create();

        // level floor
        this.addPlatform(-10, 5, 21);

        // additional platforms
        this.addPlatform(5, -5, 1, 2);
        this.addPlatform(4, -3, 3);
        
        this.addPlatform(-9.5, -1, 8);
        this.addPlatform(-2, 1, 3);
        this.addPlatform(5, 2, 6);
        this.addPlatform(4, 3, 3);

        // walls 
        
        this.addCat(-5,-9,initialState);
        this.addGateS(9,3);
        this.addGateZ(-7,-9);
        this.addGateH(4,-9);
    }
}