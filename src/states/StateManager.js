import { STATE_TYPES } from "./StateTypes";

import { eventEmit } from "../events/EventBus"
import { STATE_EVENTS, StateChangeEvent } from "./StateEvent";

class StateManager
{
    constructor()
    {
        this._state = STATE_TYPES.NULL;
        this._data = {};
    }

    setState(newState, newData = {})
    {
        if(!newState || newState === STATE_TYPES.NULL) return;
        this._state = newState;
        this._data = { ...newData };
        eventEmit(STATE_EVENTS.StateChangeEvent, new StateChangeEvent(newState, this._data));
    }

    getState()
    {
        return this._state;
    }

    getData()
    {
        return this._data;
    }
}

const global_StateManager = new StateManager();
global_StateManager.setState(STATE_TYPES.MENU);
export default global_StateManager;