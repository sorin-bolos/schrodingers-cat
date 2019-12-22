import { LevelBase } from "../LevelBase";
import { Ket, Plus, Zero, One } from '../../quantum/ket';

export class Level14 extends LevelBase
{
    create(){
        const initialState = new Ket(["0.383", "-0.924"]);
        this.name = "Level 14";

        super.create();

        // level floor
        this.addPlatform(-10, 5, 21);

        // additional platforms
        this.addPlatform(-4, 4, 9);
        this.addPlatform(-3, 3, 7);
        this.addPlatform(-2, 2, 5);
        this.addPlatform(-1, 1, 3);
        
        this.addPlatform(6, -1, 3);
        this.addPlatform(-8, 1, 3);

        // walls 
        this.addPlatform(-9, 1, 1, 5);
        this.addPlatform(-10, 1, 1, 5);
        this.addPlatform(9, -5, 1, 10);
        this.addPlatform(10, -5, 1, 10);
        
        this.addCat(-2,0,initialState);
        this.addGateH(-8,-5);
        this.addGateH(8,-9);
        this.addGateS(0,0);
        this.addGateT(-3,2);
        this.addGateY(5,2);
        this.addGateZ(6,-9);

        //YSHTZH
    }
}