import { useState, useEffect } from "react";

import global_StateManager from "../states/StateManager";

import { eventSubscribe } from "../events/EventBus";
import { STATE_EVENTS } from "../states/StateEvent";

export default function useAppNavigationHook()
{
    const [ currentStateInfo, setCurrentStateInfo ]  = useState([ global_StateManager.getState(), global_StateManager.getData() ]);

    useEffect(() => {
        const unsubscribe = eventSubscribe(STATE_EVENTS.StateChangeEvent, (stateChangeEventData) =>
        {
            setCurrentStateInfo([stateChangeEventData.newState, stateChangeEventData.data]);
        });
        return unsubscribe;
    }, []);
    return currentStateInfo;
}