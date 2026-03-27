import "../../styles/Component_NavigationBar.css"

import ProgressBar from "./ProgressBar"

export default function NavigationBar({ logoPath, title, progress })
{
    return (<>
        <image src={logoPath} alt="Logo" />
        <h1>{title}</h1>
        <ProgressBar value={progress} />
    </>);
}