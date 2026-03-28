import "../../styles/Component_IslandButton.css";

export default function IslandButton({ imageSrc, yPos, scale, callback }) {
    return (
        <div className="component-island" style={{ top: `${yPos}%`, scale: `${scale}%` }} onClick={callback}>
            <img src={imageSrc} alt="Island" />
        </div>
    );
}