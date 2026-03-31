import "../../../styles/Component_IslandPopup.css";

import global_StateManager from "../../states/StateManager";
import { STATE_TYPES } from "../../states/StateTypes";
import ISLAND_DATA from "../../core/IslandData";
import LEVEL_DATA from "../../core/LevelData";

import PopupPanel from "../PopupPanel";
import ProgressBar from "../ProgressBar";

import global_UserData from "../../core/UserData";
import TextButton from "../TextButton";

export default function IslandPopup({ isActive = false, setActive = (val) => {}, targetIsland = 1 })
{
    const userCurrentIsland = global_UserData.currentIsland;
    const userCurrentLevel = global_UserData.currentLevel;
    let progress = (userCurrentLevel / global_UserData.getCurrentLevelData().rounds_list.length) * 100;

    if(!isActive) return <></>;

    // Island is correct, let them pass
    // Island is not yet done
    if(userCurrentIsland < targetIsland)
    {
        progress = 0;
            return (
        <PopupPanel className="component-island_popup" isActive={isActive} setActive={setActive}>
            <div className="component-island_popup-container">
                <h1>Island #{targetIsland}</h1>
                <h1>Level 0/{ISLAND_DATA[targetIsland].length}</h1>
                <div className="component-island_popup-data">
                    <ProgressBar value={progress}/>
                    <h3>Finish the previous islands to proceed :3</h3>
                </div>
            </div>
        </PopupPanel>);
    }
    else if(userCurrentIsland > targetIsland)
    {
        progress = 100;
        return (
        <PopupPanel className="component-island_popup" isActive={isActive} setActive={setActive}>
            <div className="component-island_popup-container">
                <h1>Island #{targetIsland}</h1>
                <h1>Level {ISLAND_DATA[targetIsland].length}/{ISLAND_DATA[targetIsland].length}</h1>
                <div className="component-island_popup-data">
                    <ProgressBar value={progress}/>
                    <h3>Island already explored! Go Beyond!</h3>
                </div>
            </div>
        </PopupPanel>);
    }

        return (
    <PopupPanel className="component-island_popup" isActive={isActive} setActive={setActive}>
        <div className="component-island_popup-container">
            <h1>Island #{targetIsland}</h1>
            <h1>Level {userCurrentLevel}/{ISLAND_DATA[userCurrentIsland].length}</h1>
            <div className="component-island_popup-data">
                <ProgressBar value={progress}/>
                <TextButton text={"Explore Island"} callback={() =>
                {
                    global_StateManager.setState(
                        STATE_TYPES.LEVEL,
                        LEVEL_DATA[ISLAND_DATA[targetIsland][userCurrentLevel - 1]]
                    );
                    setActive(null);
                }}></TextButton>
            </div>
        </div>
    </PopupPanel>);
}