import "../../styles/Component_TextButton.css";

import useSoundPlayer from "../hooks/UseSoundPlayerHook";
import SOUND_TYPES from "../utils/SoundTypes";

export default function TextButton({ text, callback, toggled=false }) {
    const [ playSFX ] = useSoundPlayer(SOUND_TYPES.BUTTON_CLICKED);

    const onButtonClick = () => {
        playSFX();
        callback();
    };

    return (
        <>
            <button className={`component-text_button ${toggled ? 'component-text_button-toggled' : ''}`} onClick={onButtonClick}>{text}</button>
        </>
    );
}