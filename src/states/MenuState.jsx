import "../../styles/MenuState.css";

import NavigationBar from "../components/menu_components/MenuNavigationBar";
import SideBar from "../components/menu_components/MenuSideBar";

import IslandButton from "../components/menu_components/IslandButton";

import global_UserData from "../core/UserData";
import LEVEL_DATA from "../core/LevelData";

export default function MenuState() {
    return (
        <>
            <SideBar className="freeze" />

            <NavigationBar
                className="freeze"
                logoPath={"../../assets/images/logo.png"}
                title={"Lumina"}
                progress={
                    global_UserData.currentLevel > 0
                        ? (global_UserData.currentLevel / Object.keys(LEVEL_DATA).length) * 100
                        : 0
                }
            />

            <div className="menu-scroll_container">
                <div className="menu-background-gradient"></div>

                <div className="menu-island_container">
                    <IslandButton imageSrc={"../../assets/images/island_01.png"} yPos={20}  flex={1} />
                    <IslandButton imageSrc={"../../assets/images/island_02.png"} yPos={120} flex={1} />
                    <IslandButton imageSrc={"../../assets/images/island_03.png"} yPos={220} flex={2} />
                </div>
            </div>
        </>
    );
}