import "../../../styles/QuestionnaireRound.css";

import { useState } from "react";

import TextBox from "../../components/TextBox";
import TextButton from "../../components/TextButton";

import global_UserData from "../../core/UserData";

export default function QuestionnaireRound({ levelHandler })
{
    const roundData = levelHandler.getCurrentRoundData();

    if(roundData.type === "multiple_choices")
    {
        return (
        <div className={"round-questionnaire-multiple_choices"}>
            <TextBox className="round-questionnaire-question" text={roundData.question} />
            <div className={"round-questionnaire-multiple_choices-options"}>
                {roundData.options.map((choice, index) => (
                    <TextButton key={index} text={choice} callback={() => {
                        levelHandler.setNextRound();
                        levelHandler.pushData(index);
                        global_UserData.data["island_01-total_points"] = global_UserData.data["island_01-total_points"] + roundData.points[index] || 0;
                    }} />
                ))}
            </div>
        </div>);
    }

    const [toggledButtons, setToggledButtons] = useState([0, 0, 0, 0]);
    const points = toggledButtons[0] * roundData.points[0] +
                   toggledButtons[1] * roundData.points[1] +
                   toggledButtons[2] * roundData.points[2] +
                   toggledButtons[3] * roundData.points[3];
    return (<>
        <div className={"round-questionnaire-multiple_selections"}>
            <TextBox className="round-questionnaire-question" text={roundData.question} />
            <div className={"round-questionnaire-multiple_selections-options"}>
                {roundData.options.map((choice, index) => (
                    <TextButton key={index} text={choice} toggled={toggledButtons[index] === 1} callback={() => {
                        const newToggledButtons = [...toggledButtons];
                        newToggledButtons[index] = 1 - newToggledButtons[index];
                        setToggledButtons(newToggledButtons);
                    }} />
                ))}
            </div>
            {(roundData.type === "multiple_selections") &&
            <div className="round-questionnaire-multiple_selections-submit">
                <TextButton text="Submit" callback={() => {
                    levelHandler.setNextRound();
                    levelHandler.pushData(toggledButtons);
                    global_UserData.data["island_01-total_points"] = global_UserData.data["island_01-total_points"] + points || 0;
                    setToggledButtons([0, 0, 0, 0]);
                }} />
            </div>}
        </div>
    </>);
    
}