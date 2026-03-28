import "../../styles/Component_TextBox.css";

export default function TextBox(text)
{
    return (<>
        <div className={"component-textbox"}>
            {text}
        </div>
    </>);
}