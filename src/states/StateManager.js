export default class StateManager
{
    constructor(defaultState)
    {
        this._state = defaultState;
    }

    setState(newState)
    {
        if(this.newState === null) return;
        this._state = newState; 
    }

    getState()
    {
        return this._state;
    }
}