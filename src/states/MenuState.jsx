import "../../styles/MenuState.css";
import { useEffect } from "react";

import NavigationBar from "../components/menu_components/MenuNavigationBar";
import SideBar from "../components/menu_components/MenuSideBar";

import IslandButton from "../components/menu_components/IslandButton";

import global_UserData from "../core/UserData";
import LEVEL_DATA from "../core/LevelData";

const mouseMultiplier = 30;

export default function MenuState() {
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * mouseMultiplier;
            const y = (e.clientY / window.innerHeight - 0.5) * mouseMultiplier;
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

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
                    <IslandButton imageSrc={"../../assets/images/island_01.png"} yPos={20} scale={100} />
                    <IslandButton imageSrc={"../../assets/images/island_01.png"} yPos={120} scale={100} />
                    <IslandButton imageSrc={"../../assets/images/island_01.png"} yPos={220} scale={100} />
                    <IslandButton imageSrc={"../../assets/images/island_01.png"} yPos={320} scale={100} />
                </div>
            </div>
        </>
    );
}