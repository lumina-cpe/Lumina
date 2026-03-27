const _listeners = {};   // Event-Listener pairing

// Event = Stringified Event, Data Body should be a container (class)
export function eventEmit(event, dataBody)
{
    (_listeners[event] || []).forEach(listener => {
        listener(dataBody);
    });
}

// Event = Stringified Event, Listener should be a function (set or lambda)
// Returns unsubscribe function
export function eventSubscribe(event, listener)
{
    _listeners[event] = _listeners[event] || [];
    _listeners[event].push(listener);
    return () => { _listeners[event] = _listeners[event].filter(oldListener => oldListener !== listener); };
}