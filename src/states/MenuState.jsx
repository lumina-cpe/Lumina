import { useRef, useState } from "react";

import "../../styles/MenuState.css";

import MenuNavigationBar from "../components/menu_components/MenuNavigationBar";
import MenuSideBar from "../components/menu_components/MenuSideBar";
import IslandButton from "../components/menu_components/IslandButton";
import MenuParallaxLayer from "../components/menu_components/MenuParallaxLayer";

import globalUserData from "../core/UserData";
import levelData from "../core/LevelData";

import IslandPopup from "../components/menu_components/IslandPopup";

export default function MenuState()
{
    const [ activePanel, setActivePanel ] = useState(null);
    const scrollContainerRef = useRef(null);

    const progressValue = globalUserData.currentLevel > 0
        ? (globalUserData.currentLevel / Object.keys(levelData).length) * 100
        : 0;

    return (
        <>
            <MenuSideBar className="freeze" />

            <MenuNavigationBar
                className="freeze"
                logoPath={"../../assets/images/logo.png"}
                title={"Lumina"}
                progress={progressValue}
            />

            <div
                ref={scrollContainerRef}
                className="menu-scroll_container"
            >
                <div className="menu-background_gradient"></div>

                <MenuParallaxLayer
                    scrollContainerRef={scrollContainerRef}
                    mouseStrength={8}
                    scrollStrength={0.015}
                    scale={1}
                />

                <div className="menu-island_container">
                    <IslandButton
                        imageSrc={"../../assets/images/island_0111.png"}
                        foregroundSrc={"../../assets/images/foreground.png"}
                        yPos={50}
                        scale={150}
                    />

                    <IslandButton
                        imageSrc={"../../assets/images/island_0222.png"}
                        foregroundSrc={"../../assets/images/foreground.png"}
                        yPos={220}
                        scale={150}
                    />

                    <IslandButton
                        imageSrc={"../../assets/images/island_0333.png"}
                        foregroundSrc={"../../assets/images/foreground.png"}
                        yPos={320}
                        scale={150}
                    />
                </div>

                <IslandPopup isActive={activePanel === "island"} setActive={setActivePanel}></IslandPopup>
            </div>
        </>
    );
}