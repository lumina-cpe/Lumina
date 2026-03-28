import "../../styles/QuestionnaireState.css";

import { useState } from "react";

import ProgressBar from "../components/ProgressBar";
import IconButton from "../components/IconButton";

import QuestionnaireRound from "./QuestionnaireRound";

import globalStateManager from "./StateManager";
import { STATE_TYPES } from "./StateTypes";

// PREIMPORTS
import r1101 from "../../assets/data/r1101.json";
import r1102 from "../../assets/data/r1102.json";
import r1103 from "../../assets/data/r1103.json";
import r1104 from "../../assets/data/r1103.json";
import r1105 from "../../assets/data/r1103.json";

const storedRounds = 
{ 
    "r1101": r1101, 
    "r1102": r1102, 
    "r1103": r1103,
    "r1104": r1104,
    "r1105": r1105
};

export default function QuestionnaireState({ levelData })
{
    if(levelData.type !== "questionnaire") return <h1>Invalid questionnaire</h1>
    const [round, setRound] = useState(0);

    return (<>
        <div className="questionnaire-navbar">
            <ProgressBar className="questionnaire-progress_bar" value={(round / levelData.rounds_list.length) * 100} />
            <IconButton className="questionnaire-navbar-exit_button" iconPath={"../../assets/svgs/exit_icon.svg"} callback={() => {
                globalStateManager.setState(STATE_TYPES.MENU);
            }} />
        </div>
        <QuestionnaireRound roundData={storedRounds["r" + levelData.rounds_list[round]]} round={round} setRound={setRound} />
    </>);
}