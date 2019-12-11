import { LevelBase } from "../LevelBase";

export class TestLevel extends LevelBase
{
    create(){
        super.create();
        
        this.addPlatform(0, 500, 800);
        this.addPlatform(100, 300, 500);
        this.addPlatform(600, 400, 800);
        
        this.addCat(100,450);
        this.addCat(200,100);
        this.addGateT(300,200);
        this.addGateH(700,200);
    }
}