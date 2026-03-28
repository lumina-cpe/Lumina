import "../../styles/MenuState.css";
import { useEffect, useRef } from "react";

import NavigationBar from "../components/NavigationBar";
import SideBar from "../components/SideBar";

import IslandButton from "../components/IslandButton";

import global_StateManager from "./StateManager";
import { STATE_TYPES } from "./StateTypes";

export default function MenuState() {
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (<>
        <SideBar className="freeze" />
        <NavigationBar className="freeze" logoPath={"../../assets/images/logo.png"} title={"Lumina"} progress={20}/>
        
        <div className="menu-scroll_container">
            <div className="menu-background-gradient"></div>

            <div className="menu-island_container">
                <IslandButton imageSrc={"../../assets/images/island_01.png"} yPos={20}  scale={100} callback={() => { global_StateManager.setState(STATE_TYPES.QUESTIONNAIRE); }} />
                <IslandButton imageSrc={"../../assets/images/island_01.png"} yPos={120} scale={100} callback={() => { global_StateManager.setState(STATE_TYPES.QUESTIONNAIRE); }} />
                <IslandButton imageSrc={"../../assets/images/island_01.png"} yPos={220} scale={100} callback={() => { global_StateManager.setState(STATE_TYPES.QUESTIONNAIRE); }} />
                <IslandButton imageSrc={"../../assets/images/island_01.png"} yPos={320} scale={100} callback={() => { global_StateManager.setState(STATE_TYPES.QUESTIONNAIRE); }} />
            </div>
        </div>
    </>);
}