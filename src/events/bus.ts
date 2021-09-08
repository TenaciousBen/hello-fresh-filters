export type EventHandler<T> = (event: T) => void;
export interface Bus<T> {
    subscribe: (handler: EventHandler<T>) => void,
    unsubscribe: (handler: EventHandler<T>) => void
    notify: (event: T) => void
}

export const bus = <T>(): Bus<T> => {
    let handlers: EventHandler<T>[] = [];
    const instance: Bus<T> = {
        subscribe: (handler) => handlers.push(handler),
        unsubscribe: (handler) => handlers = handlers.filter(h => h !== handler),
        notify: (event) => handlers.forEach(handler => handler(event))
    };
    return instance;
};