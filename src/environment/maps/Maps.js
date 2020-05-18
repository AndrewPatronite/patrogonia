import { Legend } from './Legend';

const {
    WATER: W,
    GRASS: G,
    MOUNTAIN: M,
    DIRT: D,
    ROCK: R,
    LAVA: L,
    FOREST: F,
    TOWN: T,
} = Legend.symbols;

export const Maps = {
    canTraverse(nextPosition) {
        return [G, D, F, T].includes(nextPosition);
    },

    isTravelDestination(name) {
        return ['field1', 'cave1', 'field2'].includes(name);
    },

    isTown(name) {
        return name === T;
    },

    field1(entranceName = 'start') {
        return {
            name: 'field1',
            layout: [
                [W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, G, G, W, W, W, W, W, W],
                [W, W, W, W, G, G, G, G, G, G, W, W, W],
                [W, W, W, G, G, G, W, W, G, G, G, W, W],
                [W, W, W, M, F, G, W, W, G, G, G, W, W],
                [W, W, M, M, M, G, W, T, G, G, W, W, W],
                [W, W, M, M, 'cave1', G, W, W, W, G, G, W, W],
                [W, W, F, M, M, F, G, G, G, G, W, W, W],
                [W, W, W, F, F, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W],
            ],
            entrance: {
                start: {
                    rowIndex: 6,
                    columnIndex: 7,
                },
                cave1: {
                    rowIndex: 7,
                    columnIndex: 4,
                },
            }[entranceName],
        };
    },

    cave1(entranceName = 'field1') {
        // prettier-ignore
        return {
            name: 'cave1',
            layout: [
                [L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L],
                [L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L, L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L],
                [L, R, 'field1', R, D, D, D, D, D, D, D, D, D, D, D, D, R, L, L, R, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, R, L],
                [L, R, D, R, R, D, R, R, R, R, R, R, R, R, R, D, R, L, L, R, D, R, R, R, R, R, R, R, R, R, D, R, R, D, R, R, R, D, R, L],
                [L, R, D, R, R, D, R, R, R, R, R, R, D, R, R, D, R, L, L, R, D, R, R, R, R, R, R, R, R, R, D, R, R, D, R, R, R, D, R, L],
                [L, R, D, R, R, D, R, R, R, R, R, R, D, R, R, D, R, L, L, R, D, R, R, R, R, R, R, R, R, R, D, R, R, D, R, R, R, D, R, L],
                [L, R, D, R, R, D, R, R, R, R, R, R, D, R, R, D, R, L, L, R, D, R, R, R, R, R, R, R, R, R, D, R, R, D, R, R, R, D, R, L],
                [L, R, D, R, R, D, R, R, R, R, R, R, D, R, R, D, R, L, L, R, D, R, R, R, R, R, R, R, R, R, D, R, R, D, R, R, R, D, R, L],
                [L, R, D, R, R, D, R, R, R, R, R, R, D, D, R, D, R, L, L, R, D, R, R, R, R, R, R, R, R, R, R, R, R, D, R, R, R, D, R, L],
                [L, R, D, R, R, D, R, R, R, R, R, R, R, D, R, D, R, L, L, R, D, R, R, R, R, R, R, D, D, D, D, R, R, D, R, R, R, D, R, L],
                [L, R, D, R, R, D, R, R, R, R, R, R, R, D, R, D, R, L, L, R, D, R, R, R, R, R, R, D, R, R, D, R, R, D, R, R, R, D, R, L],
                [L, R, D, R, R, D, R, R, R, R, R, R, D, D, R, D, R, L, L, R, D, R, R, R, R, R, R, D, R, R, D, R, R, D, R, R, R, D, R, L],
                [L, R, D, R, R, D, D, R, R, R, R, R, D, R, R, D, R, R, R, R, D, R, R, R, R, R, R, D, R, R, D, R, R, D, D, R, R, D, R, L],
                [L, R, D, D, D, R, D, D, D, D, D, D, D, D, R, D, D, D, D, D, D, R, R, D, D, D, D, D, R, R, D, D, D, R, R, D, D, D, R, L],
                [L, R, D, R, D, D, D, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, D, D, R, R, R, R, R, R, D, R, D, D, D, R, R, D, R, L],
                [L, R, D, R, R, R, D, R, R, R, R, R, R, R, R, D, D, D, D, D, D, R, D, R, R, R, R, R, R, R, D, R, R, R, D, R, R, D, R, L],
                [L, R, D, D, D, D, D, D, D, D, D, D, D, D, R, D, R, R, R, R, D, D, D, R, D, D, D, D, D, D, D, D, D, D, D, D, D, D, R, L],
                [L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, D, R, L, L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L],
                [L, L, L, L, L, L, L, L, L, L, L, L, L, L, R, D, R, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L],
                [L, L, L, L, L, L, L, L, L, L, L, L, L, L, R, D, R, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L],
                [L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, D, R, L, L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L],
                [L, R, D, R, D, D, D, D, D, D, D, D, D, D, D, D, R, L, L, R, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, R, L],
                [L, R, D, R, R, D, R, R, R, R, R, R, R, R, R, R, R, R, R, R, D, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, D, R, L],
                [L, R, D, R, R, D, R, R, D, D, D, D, D, R, R, D, D, D, D, D, D, D, D, D, D, D, D, D, R, R, D, D, D, D, R, R, R, D, R, L],
                [L, R, D, R, R, D, R, D, R, R, R, R, D, R, R, D, R, R, R, R, R, R, R, R, R, R, R, D, R, R, D, R, R, D, R, R, R, D, R, L],
                [L, R, D, R, R, D, R, D, R, L, L, R, D, R, R, D, R, L, L, L, L, L, L, L, R, R, R, D, R, R, D, R, R, D, R, R, R, D, R, L],
                [L, R, D, R, R, D, R, D, R, L, L, R, D, R, R, D, R, L, R, R, R, R, R, L, R, R, R, D, R, R, D, R, R, D, R, R, R, D, R, L],
                [L, R, D, R, R, D, R, D, R, L, L, R, D, R, R, D, R, L, R, D, D, D, R, L, L, L, R, D, R, R, D, R, R, D, R, R, R, D, R, L],
                [L, R, D, R, R, D, R, D, R, L, L, R, D, R, R, D, R, L, R, D, R, D, R, L, R, L, R, D, R, R, D, R, R, D, R, R, R, D, R, L],
                [L, R, D, R, R, D, R, D, R, R, R, R, D, R, R, D, R, L, R, D, R, D, R, R, R, L, R, D, R, R, D, R, R, D, R, R, R, D, R, L],
                [L, R, D, R, R, D, R, D, D, D, D, D, D, R, R, D, R, L, R, D, R, D, D, D, R, L, R, D, R, R, D, R, R, D, R, R, R, D, R, L],
                [L, R, D, R, R, D, D, R, R, R, R, R, D, R, R, D, R, L, R, D, D, R, R, D, R, L, R, D, R, R, D, R, D, D, R, R, R, D, R, L],
                [L, R, D, D, D, R, D, D, D, D, D, D, D, R, R, D, R, L, R, R, D, R, R, D, R, R, R, R, R, R, D, R, D, R, D, D, D, D, R, L],
                [L, R, D, R, D, D, D, R, R, R, R, R, R, R, R, D, R, L, L, R, D, R, R, D, D, D, D, D, D, D, D, R, D, D, D, R, R, D, R, L],
                [L, R, D, R, R, R, R, R, R, R, R, R, R, R, D, D, R, L, L, R, D, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L],
                [L, R, D, D, D, D, D, D, D, D, D, D, D, D, D, R, R, L, L, R, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, 'field2', R, L],
                [L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L, L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L],
                [L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L],

            ],
            entrance: {
                field1: {
                    rowIndex: 2,
                    columnIndex: 2,
                },
                field2: {
                    rowIndex: 35,
                    columnIndex: 37,
                },
            }[entranceName],
        };
    },

    field2() {
        // prettier-ignore
        return {
            name: 'field2',
            layout: [
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, G, G, G, G, W, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, D, D, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, G, G, G, M, M, G, G, G, G, G, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, D, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, G, G, M, M, M, M, M, M, M, M, M, M, M, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, D, D, W, W],
                [W, W, W, W, W, W, W, W, W, W, G, G, M, M, G, G, G, G, M, F, F, F, M, M, M, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, D, D, D, W, W, W],
                [W, W, W, W, W, W, W, W, W, F, F, M, M, G, G, M, G, G, G, G, G, G, G, G, M, F, F, F, F, F, F, W, W, W, W, W, W, W, W, W, W, W, W, W, D, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, F, F, F, G, G, M, M, M, M, F, F, F, F, F, F, M, M, M, M, F, F, F, F, D, D, W, W, W, W, W, W, W, W, W, W, D, D, W, W, W, W],
                [W, W, W, W, W, W, W, F, F, F, F, F, F, M, M, M, M, M, M, F, M, M, F, M, M, M, M, M, M, F, G, G, W, D, G, W, W, W, W, W, W, W, W, W, W, D, W, W, W, W],
                [W, W, W, W, W, W, F, F, F, F, F, F, F, F, F, D, T, M, M, M, M, M, M, M, F, M, M, M, M, F, F, W, W, G, G, G, W, W, W, W, W, W, W, W, W, D, D, W, W, W],
                [W, W, W, W, W, G, G, G, G, G, G, G, F, F, D, D, M, M, F, F, F, F, F, F, G, F, M, M, F, G, G, W, G, G, G, G, G, G, G, G, G, G, W, W, W, W, D, G, W, W],
                [W, W, W, W, W, G, G, G, G, G, G, F, F, F, D, M, M, F, G, G, G, G, G, G, G, F, M, M, G, G, G, W, G, G, G, G, G, G, G, G, G, G, G, W, W, W, D, G, W, W],
                [W, W, W, W, W, W, G, G, G, G, G, G, F, F, D, M, F, F, G, G, G, G, G, G, G, G, M, M, G, G, G, W, G, G, G, G, G, F, G, G, G, F, F, F, W, D, G, G, W, W],
                [W, W, W, W, W, W, W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, M, M, F, G, G, G, W, W, W, W, G, G, F, F, G, F, F, T, G, W, D, G, G, W, W],
                [W, W, W, W, W, W, G, G, G, G, G, G, G, G, G, G, G, G, F, F, F, G, G, G, G, F, M, F, F, F, G, G, G, G, W, W, G, G, G, F, F, F, G, G, W, D, G, W, W, W],
                [W, W, W, W, W, W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, F, M, M, F, G, G, G, G, G, G, W, W, W, G, G, F, G, G, W, W, D, W, W, W, W],
                [W, W, W, W, W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, F, M, M, M, F, W, G, G, G, G, G, G, W, G, G, G, G, W, W, D, D, W, W, W, W],
                [W, W, W, W, W, G, G, G, G, G, M, G, G, G, G, G, G, G, G, G, W, W, W, W, W, W, M, M, M, W, W, W, W, W, G, G, D, W, W, W, W, W, W, D, D, W, W, W, W, W],
                [W, W, W, W, W, G, G, G, G, M, M, M, G, G, G, G, G, G, G, G, W, W, W, W, W, W, W, M, M, W, W, W, W, W, W, W, D, D, D, D, D, D, D, D, W, W, W, W, W, W],
                [W, W, W, W, G, G, G, G, M, M, F, F, G, G, G, G, G, G, G, G, W, W, W, W, W, W, W, M, M, M, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, G, G, G, M, M, M, F, F, G, G, G, G, G, G, G, G, W, W, W, W, W, W, W, W, W, M, M, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, F, M, M, F, F, F, F, G, G, G, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, G, F, F, 'cave1', F, G, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, G, F, F, F, F, F, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, G, G, F, F, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, G, G, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],

            ],
            entrance: {
                rowIndex: 21,
                columnIndex: 7,
            },
        };
    },
};
