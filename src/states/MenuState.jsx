import "../../styles/MenuState.css";

import NavigationBar from "../components/NavigationBar";
import SideBar from "../components/SideBar";

export default function MenuState()
{
    // CODE HERE
    return (<>
        <NavigationBar logoPath={"../../assets/images/logo.png"} title={"Lumina: Shedding Light to the World of Computer Engineering"} progress={"20"}/>
        <SideBar />
    </>);
}