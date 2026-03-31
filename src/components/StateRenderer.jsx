import { STATE_TYPES } from "../states/StateTypes";

import MenuState from "../states/MenuState";
import LevelState from "../states/LevelState";

export default function StateRenderer({ state, data, changeState })
{
    switch(state)
    {
        case STATE_TYPES.MENU: 
            return <MenuState/>;
        case STATE_TYPES.LEVEL:
            return <LevelState 
                        levelData={data} 
                        onMenuReturn={() => changeState(STATE_TYPES.MENU)} 
                    />;
        default: 
            console.log(`Error: State ${state} not found`);
            return null;
    }
}