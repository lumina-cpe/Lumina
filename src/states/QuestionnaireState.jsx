import "../../styles/QuestionnaireState.css";

import { useState, useEffect } from "react";

import ProgressBar from "../components/ProgressBar";
import IconButton from "../components/IconButton";

import QuestionnaireRound from "./QuestionnaireRound";

import globalStateManager from "./StateManager";
import { STATE_TYPES } from "./StateTypes";

import global_UserData from "../core/UserData";
import ROUND_DATA from "../core/RoundData";

export default function QuestionnaireState({ levelData })
{
    if(levelData.type !== "questionnaire") return <h1>Invalid questionnaire: {`${levelData}`}</h1>
    const [round, setRound] = useState(0);

    useEffect(() => {
        if (round >= levelData.rounds_list.length) {
            global_UserData.incrementLevel();
            globalStateManager.setState(STATE_TYPES.MENU);
        }
    }, [round, levelData.rounds_list.length]);

    if (round >= levelData.rounds_list.length) return null;

    return (<>
        <div className="questionnaire-navbar">
            <ProgressBar className="questionnaire-progress_bar" value={(round / levelData.rounds_list.length) * 100} />
            <IconButton className="questionnaire-navbar-exit_button" imagePath={"../../assets/svgs/exit_icon.svg"} callback={() => {
                globalStateManager.setState(STATE_TYPES.MENU);
            }} />
        </div>
        <QuestionnaireRound roundData={ROUND_DATA["r" + levelData.rounds_list[round]]} round={round} setRound={setRound} />
    </>);
}