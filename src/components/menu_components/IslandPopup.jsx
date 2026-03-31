import "../../../styles/Component_IslandPopup.css";

import PopupPanel from "../PopupPanel";
import ProgressBar from "../ProgressBar";

import global_UserData from "../../core/UserData";
import TextButton from "../TextButton";

export default function IslandPopup({ isActive = false, setActive = () => {}, targetIsland = 1 })
{
    const userCurrentIsland = global_UserData.currentIsland;
    const userCurrentLevel = global_UserData.currentLevel;
    const progress = userCurrentLevel / global_UserData.getCurrentLevelData().rounds_list.length;
    const islandDone = progress == 1;

    // Island is correct, let them pass
    // Island is not yet done
    if(userCurrentIsland < targetIsland)
    {
        progress = 0;
        return (
        <PopupPanel className="component-island_popup" isActive={isActive} setActive={setActive}>
            <h1>Island #{targetIsland}</h1>
            <ProgressBar value={progress}/>
            <h3>Finish the previous islands to proceed :3</h3>
        </PopupPanel>);
    }
    else if(userCurrentIsland > targetIsland)
    {
        progress = 1;
        return (
        <PopupPanel className="component-island_popup" isActive={isActive} setActive={setActive}>
            <h1>Island #{targetIsland}</h1>
            <ProgressBar value={progress}/>
            <h3>Island already explored! Go Beyond!</h3>
        </PopupPanel>);
    }

    return (
    <PopupPanel className="component-island_popup" isActive={isActive} setActive={setActive}>
        <h1>Island #{targetIsland}</h1>
        <ProgressBar value={progress}/>
        <TextButton text={"Explore Island"} callback={() =>
        {
            global_StateManager.setState(
                STATE_TYPES.LEVEL,
                LEVEL_DATA[`${global_UserData.currentIsland}${global_UserData.currentLevel}`]
            );
        }}></TextButton>
    </PopupPanel>);
}