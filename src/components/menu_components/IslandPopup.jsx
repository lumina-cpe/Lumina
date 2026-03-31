import "../../../styles/Component_IslandPopup.css";

import PopupPanel from "../PopupPanel";

export default function IslandPopup({ isActive = false, setActive = () => {} })
{
    return (
    <PopupPanel className="component-island_popup" isActive={isActive} setActive={setActive}>
        Hello World
    </PopupPanel>)
}