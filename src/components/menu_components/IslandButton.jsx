import "../../../styles/Component_IslandButton.css";

import global_StateManager from "../../states/StateManager";
import { STATE_TYPES } from "../../states/StateTypes";

import LEVEL_DATA from "../../core/LevelData";
import global_UserData from "../../core/UserData";

export default function IslandButton({ imageSrc, yPos, scale }) {
    return (
        <div className="component-island" style={{ top: `${yPos}%`, scale: `${scale}%` }} onClick={
            () => {
                global_StateManager.setState(STATE_TYPES.LEVEL, LEVEL_DATA[`${global_UserData.currentIsland}${global_UserData.currentLevel}`]);
            }
        }>  <img src={imageSrc} alt="Island" />
        </div>
    );
}