export const STATE_EVENTS = 
{
    StateChangeEvent: "StateChangeEvent",
};

export class StateChangeEvent
{
    constructor(newState)
    {
        this.newState = newState;
    }
}