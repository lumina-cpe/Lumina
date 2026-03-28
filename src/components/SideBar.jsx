import "../../styles/Component_SideBar.css"

import TextButton from "./TextButton"; 
import IconButton from "./IconButton"; 

export default function SideBar() {
    return (<>
        <div className="component-sidebar">``
            <TextButton text="Achievements"  callback={() => {}} />
            <TextButton text="Settings"      callback={() => {}} />
            <TextButton text="More Settings" callback={() => {}} />

        <IconButton imagePath="../../assets/svgs/github_icon.svg" callback={() => {
            window.open("https://github.com/liantomate/web_design_cpe_olympiad_2026", "_blank");
        }} />
        <IconButton imagePath="../../assets/svgs/wikipedia_icon.svg" callback={() => {
            window.open("https://en.wikipedia.org/wiki/Computer_engineering", "_blank");
        }}/>
        </div>
    </>);
}