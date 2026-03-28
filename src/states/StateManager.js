import { STATE_TYPES } from "./StateTypes";

import { eventEmit } from "../events/EventBus"
import { STATE_EVENTS, StateChangeEvent } from "./StateEvent";

class StateManager
{
    constructor()
    {
        this._state = STATE_TYPES.NULL;
    }

    setState(newState)
    {
        if(!newState || newState === STATE_TYPES.NULL) return;
        this._state = newState;
        eventEmit(STATE_EVENTS.StateChangeEvent, new StateChangeEvent(newState));
    }

    getState()
    {
        return this._state;
    }
}

const global_StateManager = new StateManager();
global_StateManager.setState(STATE_TYPES.QUESTIONNAIRE );
export default global_StateManager;