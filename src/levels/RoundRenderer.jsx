import QuestionnaireRound from "./rounds/QuestionnaireRound";
import Island01ArticleRound from "./rounds/Island01ArticleRound";
import Island02PuzzleRound from "./rounds/Island02PuzzleRound";
import CongratulationsRound from "./rounds/CongratulationsRound";
import Island03CareerRounds from "./rounds/Island03CareerRounds";

export default function RoundRenderer({ levelHandler, onMenuReturn })
{
    let roundData = undefined;
    roundData = levelHandler.getCurrentRoundData() || roundData;
    const roundKey = levelHandler.externalRound;

    // there are three (quite badly) categories of rounds
    // multiple choices round
    // multiple selections round
    // literally everything else

    if(roundData === undefined) return <CongratulationsRound key={roundKey} levelHandler={levelHandler} onMenuReturn={onMenuReturn} />;
    
    if(roundData.type === "multiple_choices" || roundData.type === "multiple_selections")
        return <QuestionnaireRound key={roundKey} levelHandler={levelHandler} />;
    
    // below are the "everything else" rounds
    if(roundData.type === "island_01-level_03") return <Island01ArticleRound key={roundKey} levelHandler={levelHandler} />;
    if(roundData.type === "island_02-levels") return <Island02PuzzleRound key={roundKey} levelHandler={levelHandler} />;
    if(roundData.type === "island_03_level_02") return <Island03CareerRounds key={roundKey} levelHandler={levelHandler} />;
}