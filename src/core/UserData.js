import LEVEL_DATA from "./LevelData";

class UserData 
{
    constructor(currentIsland, currentLevel) 
    {
        this.currentIsland = currentIsland;
        this.currentLevel = currentLevel;
        this.data = {};
        this.obtainedAchievements = [];
    }

    incrementLevel() 
    {
        if (!this.isNextLevelAvailable()) 
        {
            this.currentLevel = 1;
            this.currentIsland++;
            return;
        }
        this.currentLevel++;
    }

    getCurrentLevelData()
    {
        return LEVEL_DATA[`${this.currentIsland}${this.currentLevel}`];
    }

    isNextLevelAvailable() 
    {
        return LEVEL_DATA[`${this.currentIsland}${this.currentLevel + 1}`] !== undefined;
    }

    saveAchievements(newAchievements) 
    {
        newAchievements.forEach((achievement) => 
        {
            if (!this.obtainedAchievements.find(a => a.id === achievement.id)) 
            {
                this.obtainedAchievements.push(achievement);
            }
        });
    }
}

const global_UserData = new UserData(1, 1);
export default global_UserData;