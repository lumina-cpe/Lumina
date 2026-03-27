import { STATE_TYPES } from "../states/StateTypes";

import MenuState from "../states/MenuState";

export default function StateRenderer({ state })
{
    // TODO: implement state components
    switch(state)
    {
        case STATE_TYPES.MENU: 
            return <MenuState/>;
        case STATE_TYPES.QUESTIONNAIRE:
            return <></>;
        case STATE_TYPES.GAME:
            return <></>;
        default: 
            console.log(`Error: State ${state} not found`);
            return null;
    }
}