import "../../styles/Component_ProgressBar.css"

export default function ProgressBar({ value })
{
    return (<>
        <div className={"component-progress_bar-outer"}>
            <div className={"component-progress_bar-inner"} style={{width: `${value}%`}}></div>
        </div>
    </>);
}