import { LevelBase } from "../LevelBase";
import { Ket, Plus, Zero, One } from '../../quantum/ket';

export class Level16 extends LevelBase
{
    create(){
        const initialState = new Ket(["0.924", "0.270+0.270i"]);
        this.name = "Level 16";

        super.create();

        // level floor
        this.addPlatform(-10, 5, 21);

        // additional platforms
        this.addPlatform(3, 3, 1);
        this.addPlatform(7, 3, 1);
        this.addPlatform(-1, 3, 1);
        this.addPlatform(-5, 3, 1);
        this.addPlatform(-9, 3, 1);
        this.addPlatform(7, -1, 1);
        this.addPlatform(3, -1, 1);
        this.addPlatform(-1, -1, 1);
        this.addPlatform(-5, -1, 1);
        this.addPlatform(-9, -1, 1);
        this.addPlatform(9, -3, 1);
        this.addPlatform(5, -3, 1);
        this.addPlatform(1, -3, 1);
        this.addPlatform(-3, -3, 1);
        this.addPlatform(-7, -3, 1);
        this.addPlatform(9, 1, 1);
        this.addPlatform(5, 1, 1);
        this.addPlatform(1, 1, 1);
        this.addPlatform(-3, 1, 1);
        this.addPlatform(-7, 1, 1);

        // walls 
        
        this.addCat(0,3,initialState);
        this.addGateX(-9,-9);
        this.addGateX(-9,0);
        this.addGateY(-7,-9);
        this.addGateY(-7,0);
        this.addGateZ(-5,-9);
        this.addGateZ(-5,0);
        this.addGateH(-3,-9);
        this.addGateH(-3,0);
        this.addGateS(-1,-9);
        this.addGateS(-1,0);
        this.addGateT(1,-9);
        this.addGateT(1,0);
        this.addGateSdag(3,-9);
        this.addGateSdag(3,0);
        this.addGateTdag(5,-9);
        this.addGateTdag(5,0);
        this.addGateH(7,-9);
        this.addGateH(7,0);
        this.addGateX(9,-9);
        this.addGateX(9,0);
    }
}