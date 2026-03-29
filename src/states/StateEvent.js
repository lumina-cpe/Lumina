export const STATE_EVENTS = 
{
    StateChangeEvent: "StateChangeEvent",
};

export class StateChangeEvent
{
    constructor(newState, data = {})
    {
        this.newState = newState;
        this.data = data;
    }
}