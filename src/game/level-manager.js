import { Level1 } from "./levels/Level1";
import { Level2 } from "./levels/Level2";
import { Level3 } from "./levels/Level3";
import { Level4 } from "./levels/Level4";
import { Level5 } from "./levels/Level5";
import { Level6 } from "./levels/Level6";
import { Level7 } from "./levels/Level7";
import { Level8 } from "./levels/Level8";
import { Level9 } from "./levels/Level9";
import { Level10 } from "./levels/Level10";
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
        Level1,
        Level2,
        Level3,
        Level4,
        Level5,
        Level6,
        Level7,
        Level8,
        Level9,
        Level10,
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