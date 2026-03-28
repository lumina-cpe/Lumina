import TextBox from "../components/TextBox";
import TextButton from "../components/TextButton";

export default function QuestionnaireRound({ roundData, round, setRound })
{
    if(roundData.type === "multiple_choices" || roundData.type === "multiple_selections")
    {
        return (<>
            <div className={roundData.type === "multiple_choices" ? "questionnaire-multiple_choices" : "questionnaire-multiple_selections"}>
                <TextBox className="questionnaire-question" text={roundData.question} />
                <div className={roundData.type === "multiple_choices" ? "questionnaire-multiple_choices-options" : "questionnaire-multiple_selections-options"}>
                    {roundData.options.map((choice, index) => (
                        <TextButton key={index} text={choice} callback={() => {setRound(round + 1);}} />
                    ))}
                </div>
                {(roundData.type === "multiple_selections") &&
                <div className="questionnaire-multiple_selections-submit">
                    <TextButton text="Submit" callback={() => {setRound(round + 1);}} />
                </div>}
            </div>
        </>);
    }
    else if(roundData.type === "article")
        {
            return (<>
                <TextBox className="questionnaire-article-textbox" text={roundData.question} />
                <TextButton text="Finish" callback={() => {setRound(round + 1);}} />    
            </>);
    }
    
    console.error("Unknown round type: " + roundData.type);
    return <h1>Unknown round type: {roundData.type}</h1>;
}