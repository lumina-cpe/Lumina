import "../../styles/Component_TextButton.css";

import useSoundPlayer from "../hooks/UseSoundPlayerHook";

export default function TextButton({ text, callback, toggled=false }) {
    const sfx = "../../assets/sfx/button_click_01.mp3";
    const [ playSFX ] = useSoundPlayer(sfx);

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