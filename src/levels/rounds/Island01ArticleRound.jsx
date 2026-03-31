import "../../../styles/Island01ArticleRound.css";
import global_UserData from "../../core/UserData";

function GetScoreIndex(score, options)
{
    const fallbackScore = Number(score) || 0;

    if (!options || !Array.isArray(options) || options.length === 0)
    {
        return 0;
    }

    for (let i = 0; i < options.length; i++)
    {
        const bounds = options[i].split("-");
        const min = parseInt(bounds[0], 10);
        const max = parseInt(bounds[1], 10);

        if (fallbackScore >= min && fallbackScore <= max)
        {
            return i;
        }
    }

    return 0;
}

export default function Island01ArticleRound({ levelHandler, onMenuReturn })
{
    const roundData = levelHandler.getCurrentRoundData();

    const options = roundData?.options || ["0-100"];
    const headers = roundData?.headers || ["Loading Data..."];
    const contents = roundData?.contents || ["Please wait while the results load."];

    const userScore = global_UserData.getIsland01Score();
    const resultIndex = GetScoreIndex(userScore, options);

    return (
        <div className="round-island01_article">
            <div className="round-island01_article-panel">
                <h2 className="round-island01_article-header">
                    {headers[resultIndex]}
                </h2>

                <p className="round-island01_article-content">
                    {contents[resultIndex]}
                </p>

                <div className="round-island01_article-done_container">
                    <button
                        className="round-island01_article-done_button"
                        onClick={() =>
                        {
                            global_UserData.incrementLevel();

                            if (onMenuReturn)
                            {
                                onMenuReturn();
                            }
                        }}
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}