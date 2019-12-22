import { LevelBase } from "../LevelBase";
import { Ket, Plus, Zero, One } from '../../quantum/ket';

export class Level15 extends LevelBase
{
    create(){
        const initialState = new Ket(["0.383", "0.924"]);
        this.name = "Level 15";

        super.create();

        // level floor
        this.addPlatform(-10, 5, 21);

        // additional platforms
        this.addPlatform(-2, 4, 15);
        this.addPlatform(-1, 3, 14);
        this.addPlatform(0, 2, 13);
        this.addPlatform(1, 1, 12);
        this.addPlatform(2, 0, 11);
        this.addPlatform(3, -1, 10);
        //this.addPlatform(4, -2, 9);
        this.addPlatform(4, -3, 8);
        //this.addPlatform(6, -4, 7);

        // walls 
        this.addPlatform(-9, 0, 1, 5);
        this.addPlatform(-10, 0, 1, 5);
        this.addPlatform(9, -5, 1, 10);
        this.addPlatform(10, -5, 1, 10);
        
        this.addCat(-1,0,initialState);
        this.addGateZ(-8,-5);
        this.addGateH(8,-3);
        this.addGateH(1,-9);
        this.addGateS(0,0);
        this.addGateT(-2,2);
        this.addGateS(2, -3);
        this.addGateS(6,-3);
        this.addGateSdag(6,-9);

        //SHSTZSdagSH
    }
}