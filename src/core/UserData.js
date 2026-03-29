import LEVEL_DATA from "./LevelData";

class UserData {
    constructor(currentIsland, currentLevel) 
    {
        this.currentIsland = currentIsland;
        this.currentLevel = currentLevel;

        this.data = {};
    }

    incrementLevel()
    {
        if(!this.isNextLevelAvailable())
        {
            this.currentLevel = 1;
            this.currentIsland++;
            return;
        }
        this.currentLevel++;
    }

    isNextLevelAvailable()
    {
        return LEVEL_DATA[`l${this.currentIsland}${this.currentLevel + 1}`] !== undefined;
    }
}

const global_UserData = new UserData(1, 1);
export default global_UserData;