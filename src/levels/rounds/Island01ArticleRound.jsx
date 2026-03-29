import "../../../styles/Island01ArticleRound.css";

import { useState } from "react";

export default function Island01ArticleRound({ levelHandler })
{
    const roundData = levelHandler.getCurrentRoundData();
    const [ activeButton, setActiveButton ] = useState(0);

    return (
        <div className="round-island01_article">
            <div className="round-island01_article-buttons">
            </div>
            <div className="round-island01_article-panel"></div>
        </div>
    );
}