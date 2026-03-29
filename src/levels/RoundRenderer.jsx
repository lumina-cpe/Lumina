import QuestionnaireRound from "./rounds/QuestionnaireRound";
import Island01ArticleRound from "./rounds/Island01ArticleRound";

import Island02PuzzleRound from "./rounds/Island02PuzzleRound";

import CongratulationsRound from "./rounds/CongratulationsRound";

export default function RoundRenderer({ levelHandler })
{
    const roundData = levelHandler.getCurrentRoundData();

    // there are three (quite badly) categories of rounds
    // multiple choices round
    // multiple selections round
    // literally everything else
    
    if(roundData.type === "multiple_choices" || roundData.type === "multiple_selections")
        return <QuestionnaireRound levelHandler={levelHandler} />;
    
    else if(roundData.type === "island_01-level_03") return <Island01ArticleRound levelHandler={levelHandler} />;
    else if(roundData.type === "island_02-level_01") return <Island02PuzzleRound levelHandler={levelHandler} />;

    return <CongratulationsRound levelHandler={levelHandler} />;

    // below are the "everything else" rounds
}