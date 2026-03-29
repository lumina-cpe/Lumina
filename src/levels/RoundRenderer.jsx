import QuestionnaireRound from "./rounds/QuestionnaireRound";

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

    return <CongratulationsRound levelHandler={levelHandler} />;

    // below are the "everything else" rounds
}