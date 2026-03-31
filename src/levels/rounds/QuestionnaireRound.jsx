import "../../../styles/QuestionnaireRound.css";

import { useState } from "react";

import TextBox from "../../components/TextBox";
import TextButton from "../../components/TextButton";

import global_UserData from "../../core/UserData";

export default function QuestionnaireRound({ levelHandler })
{
    const roundData = levelHandler.getCurrentRoundData();

    if (roundData.type === "multiple_choices")
    {
        return (
            <div className="round-questionnaire-multiple_choices">
                <TextBox className="round-questionnaire-question" text={roundData.question} />
                <div className="round-questionnaire-multiple_choices-options">
                    {roundData.options.map((choice, index) => (
                        <TextButton
                            key={index}
                            text={choice}
                            callback={() =>
                            {
                                levelHandler.pushData(index);
                                global_UserData.addIsland01Score(roundData.points?.[index] || 0);
                                levelHandler.setNextRound();
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    const [ toggledButtons, setToggledButtons ] = useState(
        roundData.options.map(() => 0)
    );

    const points = toggledButtons.reduce((total, value, index) =>
    {
        return total + (value * (roundData.points?.[index] || 0));
    }, 0);

    const selectedCount = toggledButtons.reduce((total, value) =>
    {
        return total + value;
    }, 0);

    return (
        <div className="round-questionnaire-multiple_selections">
            <TextBox className="round-questionnaire-question" text={roundData.question} />

            <div className="round-questionnaire-multiple_selections-options">
                {roundData.options.map((choice, index) => (
                    <TextButton
                        key={index}
                        text={choice}
                        toggled={toggledButtons[index] === 1}
                        callback={() =>
                        {
                            const newToggledButtons = [ ...toggledButtons ];
                            newToggledButtons[index] = 1 - newToggledButtons[index];
                            setToggledButtons(newToggledButtons);
                        }}
                    />
                ))}
            </div>

            <div className="round-questionnaire-multiple_selections-submit">
                <TextButton
                    text={selectedCount === 0 ? "Select at least one answer" : "Submit"}
                    callback={() =>
                    {
                        if (selectedCount === 0)
                        {
                            return;
                        }

                        levelHandler.pushData(toggledButtons);
                        global_UserData.addIsland01Score(points || 0);
                        levelHandler.setNextRound();
                        setToggledButtons(roundData.options.map(() => 0));
                    }}
                />
            </div>
        </div>
    );
}