const listeners = {};   // Event-Listener pairing

// Event = Stringified Event, Data Body should be a container (class)
export function emit(event, dataBody)
{
    (listeners[event] || []).forEach(listener => {
        listener(dataBody);
    });
}

// Event = Stringified Event, Listener should be a function (set or lambda)
// Returns unsubscribe function
export function subscribe(event, listener)
{
    listeners[event] = listeners[event] || [];
    listeners[event].push(listener);
    return () => { listeners[event] = listeners[event].filter(oldListener => oldListener !== listener); };
}