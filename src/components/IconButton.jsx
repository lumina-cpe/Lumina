import "../../styles/Component_IconButton.css";

export default function IconButton({ imagePath, callback })
{
  return (
    <button className="component-icon_button" onClick={callback}>
      <img src={imagePath} alt="icon" />
    </button>
  );
}