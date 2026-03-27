import "../../styles/Component_SideBar.css"

import TextButton from "./TextButton"; 
import IconButton from "./IconButton"; 

export default function SideBar() {
    return (<>
        <div className="component-sidebar">``
            <TextButton text="Achievements"  callback={() => {}} />
            <TextButton text="Settings"      callback={() => {}} />
            <TextButton text="More Settings" callback={() => {}} />

            <IconButton imagePath="../../assets/images/github_icon.png" callback={() => {}} />
            <IconButton imagePath="../../assets/images/wikipedia_icon.png" callback={() => {}} />
        </div>
    </>);
}