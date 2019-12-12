import { TestLevel } from "./levels/TestLevel";
import { TestLevel2 } from "./levels/TestLevel2";
import { TestLevel3 } from "./levels/TestLevel3";
import { TestLevel4 } from "./levels/TestLevel4";
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
        TestLevel4
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
    startFirstLevel,
}

addLevelFinishListener(finishCurrentLevel);