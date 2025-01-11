import Store from 'electron-store';

const store = new Store({
    schema: {
        color: {
            type: 'string',
            default: '#ff0000',
        },
        size: {
            type: 'number',
            default: 0,
        },
        type: {
            type: 'string',
            default: 'default',
        }
    }
});

export function getStore() {
    return store;
}