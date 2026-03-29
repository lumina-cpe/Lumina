import "../../../styles/QuestionnaireRound.css";

import { useState } from "react";

import TextBox from "../../components/TextBox";
import TextButton from "../../components/TextButton";

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
                    }} />
                ))}
            </div>
        </div>);
    }

    const [toggledButtons, setToggledButtons] = useState([0, 0, 0, 0]);
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
                    setToggledButtons([0, 0, 0, 0]);
                }} />
            </div>}
        </div>
    </>);
    
}