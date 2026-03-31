import ROUND_DATA from "../core/RoundData";
import ACHIEVEMENTS from "../../assets/data/achievements.json";

class LevelHandler
{
    constructor(levelData, externalRound, setExternalRound)
    {
        this.levelData = levelData;
        this.data = {};
        this.achievements = [];
        this.setExternalRound = setExternalRound;
        this.externalRound = externalRound;

        console.log("[DEBUG] LevelHandler Round: ", this.externalRound);
    }

    setNextRound()
    {
        this.setExternalRound(this.externalRound + 1);
        return this.isNextRoundAvailable(this.externalRound + 1);
    }

    getCurrentRoundData()
    {
        if (this.isNextRoundAvailable(this.externalRound))
            return ROUND_DATA[this.levelData.rounds_list[this.externalRound]];
        return undefined;
    }

    getNextRoundData()
    {
        if (this.isNextRoundAvailable(this.externalRound + 1))
            return ROUND_DATA[this.levelData.rounds_list[this.externalRound + 1]];
        return undefined;
    }

    isNextRoundAvailable()
    {
        return this.externalRound < this.levelData.rounds_list.length;
    }

    pushData(value)
    {
        this.data[this.externalRound] = this.data[this.externalRound] || [];
        this.data[this.externalRound].push(value);
    }

    getData()
    {
        return this.data[this.externalRound] || [];
    }

    pushAchievement(achievement)
    {
        this.achievements.push(achievement);
    }

     collectAchievementsForLevel(levelId)
    {
        const newAchievements = ACHIEVEMENTS.filter(
            a => a.level_id === levelId && !this.achievements.find(ac => ac.id === a.id)
        );

        newAchievements.forEach(a => this.pushAchievement(a));

        return newAchievements;
    }
}

export default LevelHandler;