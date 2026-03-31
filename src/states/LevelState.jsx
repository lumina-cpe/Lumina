import "../../styles/LevelState.css";
import LevelNavigationBar from "../components/level_components/LevelNavigationBar";
import { useState } from "react";
import LevelHandler from "../levels/LeveHandler";
import RoundRenderer from "../levels/RoundRenderer";

export default function LevelState({ levelData, onMenuReturn })
{
    const [roundFinished, setRoundFinished] = useState(0);
    const levelHandler = new LevelHandler(levelData, roundFinished, setRoundFinished);

    return (
        <div className="level-container">
            <LevelNavigationBar className="level-navigation_bar" progress={ ( roundFinished / levelData.rounds_list.length ) * 100 }/>
            
            <RoundRenderer 
                className="level-round_renderer" 
                levelHandler={ levelHandler }  
                setRoundFinished={ setRoundFinished }
                onMenuReturn={ onMenuReturn } 
            />
        </div>
    );
}