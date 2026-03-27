import "../../styles/Component_TextButton.css"

export default function TextButton({ text, onClick: callback }) {
  return (
    <button className="component-text_button" onClick={callback}>{text}</button>
  );
}