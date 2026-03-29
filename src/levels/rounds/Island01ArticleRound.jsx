import "../../../styles/Island01ArticleRound.css";

export default function Island01ArticleRound({ levelHandler })
{
    const [ activeButton, setActiveButton ] = levelHandler.useActiveButton(0);

    return (
        <div className="round-island01_article">
        </div>
    );
}