import "../../styles/Component_NavigationBar.css"

import ProgressBar from "./ProgressBar"

export default function NavigationBar({ logoPath, title, progress })
{
    return (<div className="component-navigation_bar">
        <img src={logoPath} alt="Logo" />
        <h1>{title}</h1>
        <ProgressBar value={progress} />
    </div>);
}