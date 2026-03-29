import "../../styles/LevelState.css";

import LevelNavigationBar from "../components/level_components/LevelNavigationBar";

import { useState } from "react";

import LevelHandler from "../levels/LeveHandler";
import RoundRenderer from "../levels/RoundRenderer";

import ROUND_DATA from "../core/RoundData";

export default function LevelState({ levelData })
{
    const levelHandler = new LevelHandler(levelData);
    const [roundFinished, setRoundFinished] = useState(0);

    return (<>
        <LevelNavigationBar progress={ ( roundFinished / levelData.rounds_list.length ) * 100 }/>
        <RoundRenderer levelHandler={ levelHandler }  setRoundFinished={ setRoundFinished }/>
    </>);
}