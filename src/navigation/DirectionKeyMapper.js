export const DirectionKeyMapper = {
    isDirectionKey(key) {
        return [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'w',
            's',
            'a',
            'd',
        ].includes(key);
    },

    getDirection(key) {
        return {
            ArrowUp: 'up',
            ArrowDown: 'down',
            ArrowLeft: 'left',
            ArrowRight: 'right',
            w: 'up',
            s: 'down',
            a: 'left',
            d: 'right',
        }[key];
    },

    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right',
};
