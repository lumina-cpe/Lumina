import ROUND_DATA from "../core/RoundData";

class LevelHandler
{
    constructor(levelData)
    {
        this.levelData = levelData;
        this.data = {};
        this.achievements = [];
    }

    getNextRoundData(roundIndex)
    {
        if (this.isNextRoundAvailable(roundIndex))
            return ROUND_DATA[this.levelData.rounds_list[roundIndex]];
        return undefined;
    }

    isNextRoundAvailable(roundIndex)
    {
        return roundIndex < this.levelData.rounds_list.length;
    }

    pushAchievement(achievement)
    {
        this.achievements.push(achievement);
    }
}

export default LevelHandler;