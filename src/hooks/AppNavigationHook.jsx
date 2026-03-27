import { useState, useEffect } from "react";

import global_StateManager from "../states/StateManager";

import { eventSubscribe } from "../events/EventBus";
import { STATE_EVENTS } from "../states/StateEvent";

export default function useAppNavigationHook()
{
    const [ currentState, setCurrentState ]  = useState(global_StateManager.getState());

    useEffect(() => {
        const unsubscribe = eventSubscribe(STATE_EVENTS.StateChangeEvent, (stateChangeEventData) =>
        {
            setCurrentState(stateChangeEventData.newState);
        });
        return unsubscribe;
    }, []);
    return currentState;
}