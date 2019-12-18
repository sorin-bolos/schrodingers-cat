import { TestLevel } from "./levels/TestLevel";
import { TestLevel2 } from "./levels/TestLevel2";
import { TestLevel3 } from "./levels/TestLevel3";
import { TestLevel4 } from "./levels/TestLevel4";
import { TestLevel5 } from "./levels/TestLevel5";
import { TestLevel6 } from "./levels/TestLevel6";
import { TestLevel7 } from "./levels/TestLevel7";
import { TestLevel8 } from "./levels/TestLevel8";
import { TestLevel9 } from "./levels/TestLevel9";
import { TestLevel10 } from "./levels/TestLevel10";
import { Level11 } from "./levels/Level11";
import { Level12 } from "./levels/Level12";
import { Level13 } from "./levels/Level13";
import { Level14 } from "./levels/Level14";
import { Level15 } from "./levels/Level15";
import { Level16 } from "./levels/Level16";
import { addLevelFinishListener } from "./LevelBase";

let currentlevelIndex = 0;
let game = null;

function startFirstLevel(){
    currentlevelIndex = 0;
    restartLevel();
}

function getLevelClassByIndex(index){
    const levelSequence = [
        TestLevel,
        TestLevel2,
        TestLevel3,
        TestLevel4,
        TestLevel5,
        TestLevel6,
        TestLevel7,
        TestLevel8,
        TestLevel9,
        TestLevel10,
        Level11,
        Level12,
        Level13,
        Level14,
        Level15,
        Level16
    ];
    return levelSequence[index];
}

function finishCurrentLevel(isItSuccessful){
    if (isItSuccessful) {
        currentlevelIndex++;
    }
    restartLevel();
}

let uniqueId = 0;
let uniqueSceneKey = "";

function restartLevel(){
    game.scene.remove(uniqueSceneKey);
    uniqueSceneKey = "scene" + uniqueId++;
    const T = getLevelClassByIndex(currentlevelIndex);
    game.scene.add(uniqueSceneKey, T, true);
}

function setGame(phasorGame){
    game = phasorGame;
}

export default {
    setGame,
    restartLevel,
    startFirstLevel
}

addLevelFinishListener(finishCurrentLevel);