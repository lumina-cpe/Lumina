import "../../styles/Component_TextButton.css";

import { useState } from "react";

import Sound from "./Sound";

export default function TextButton({ text, callback, toggled=false }) {
    const [ playSound, setPlaySound ] = useState(false);

    const onClickSFX = () => { 
        setPlaySound(true);
        setTimeout(() => setPlaySound(false), 10);
    };

    return (
        <>
            <button className={`component-text_button ${toggled ? 'component-text_button-toggled' : ''}`} onClick={() =>
            {
                callback();
                onClickSFX();
            }}>{text}</button>
            <Sound soundPath={[
                "../../assets/sfx/button_click_01.mp3",
                "../../assets/sfx/button_click_02.mp3"
            ]} shouldPlay={ playSound } />
        </>
    );
}