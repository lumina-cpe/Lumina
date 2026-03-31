import "../../../styles/Component_IslandButton.css";

import global_StateManager from "../../states/StateManager";
import { STATE_TYPES } from "../../states/StateTypes";

import LEVEL_DATA from "../../core/LevelData";
import global_UserData from "../../core/UserData";

import { eventEmit } from "../../events/EventBus";
import SOUND_TYPES from "../../utils/SoundTypes";
import { SOUND_EVENTS, SoundRequestEvent } from "../../utils/SoundEvent";

export default function IslandButton(
{
    imageSrc,
    foregroundSrc = "",
    yPos,
    scale = 100,
    flex = 1
})
{
    const onButtonClick = () =>
    {
        eventEmit(SOUND_EVENTS.SoundRequestEvent, new SoundRequestEvent(SOUND_TYPES.ISLAND_CLICKED));
        global_StateManager.setState(
            STATE_TYPES.LEVEL,
            LEVEL_DATA[`${global_UserData.currentIsland}${global_UserData.currentLevel}`]
        );
    };

    return (
        <div
            className="component-island"
            style={{ top: `${yPos}%`, scale: `${scale}%`, flex: `${flex}` }}
        >
            <div className="component-island_visual">
                <img
                    className="component-island_image"
                    src={imageSrc}
                    alt="Island"
                    onClick={onButtonClick}
                    draggable="false"
                />

        {
            foregroundSrc && (
                     <>
                    <img
                        className="component-island_foreground component-island_foreground-light"
                        src={foregroundSrc}
                        alt="Foreground light"
                         draggable="false"
                    />

                    <img
                        className="component-island_foreground component-island_foreground-dark"
                        src={foregroundSrc.replace(".png", "_dark.png")}
                        alt="Foreground dark"
                        draggable="false"
                     />
                </>
            )
        }
            </div>
        </div>
    );
}