import Map from './Map'
import { Legend } from './Legend';
import Entrance from "./Entrance";

const {
    WATER: W,
    GRASS: G,
    MOUNTAIN: M,
    DIRT: D,
    ROCK: R,
    LAVA: L,
    FOREST: F,
} = Legend.symbols;

export const Maps = {
    canTraverse(nextPosition: string): boolean {
        return [G, D, F].includes(nextPosition) || this.isTown(nextPosition);
    },

    isTravelDestination(name: string): boolean {
        return ['Atoris', 'Lava Grotto', 'Grimes'].includes(name);
    },

    isTown(name: string): boolean {
        return ['Dewhurst', 'Fernsworth', 'Easthaven'].includes(name);
    },

    isCave(name: string): boolean {
        return ['Lava Grotto'].includes(name);
    },

    isField(name: string): boolean {
        return ['Atoris', 'Grimes'].includes(name);
    },

    'Atoris'(entranceName: string = 'start'): Map {
        return {
            name: 'Atoris',
            layout: [
                [W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, G, G, W, W, W, W, W, W],
                [W, W, W, W, G, G, G, G, G, G, W, W, W],
                [W, W, W, G, G, G, W, W, G, G, G, W, W],
                [W, W, W, M, F, G, W, W, G, G, G, W, W],
                [W, W, M, M, M, G, W, 'Dewhurst', G, G, W, W, W],
                [W, W, M, M, 'Lava Grotto', G, W, W, W, G, G, W, W],
                [W, W, F, M, M, F, G, G, G, G, W, W, W],
                [W, W, W, F, F, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W],
            ],
            entrance: ((): Entrance => { const entrances: Record<string, Entrance> = {
                start: {
                    rowIndex: 6,
                    columnIndex: 7,
                },
                'Lava Grotto': {
                    rowIndex: 7,
                    columnIndex: 4,
                },
            }
            return entrances[entranceName]})(),
        };
    },

    'Lava Grotto'(entranceName = 'Atoris'): Map {
        // prettier-ignore
        return {
            name: 'Lava Grotto',
            layout: [
                [L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L],
                [L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L, L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L],
                [L, R, 'Atoris', R, D, D, D, D, D, D, D, D, D, D, D, D, R, L, L, R, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, R, L],
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
                [L, R, D, D, D, D, D, D, D, D, D, D, D, D, D, R, R, L, L, R, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, 'Grimes', R, L],
                [L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L, L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L],
                [L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L],

            ],
            entrance: ((): Entrance => { const entrances: Record<string, Entrance> = {
                'Atoris': {
                    rowIndex: 2,
                    columnIndex: 2,
                },
                'Grimes': {
                    rowIndex: 35,
                    columnIndex: 37,
                },
            }
            return entrances[entranceName]})(),
        };
    },

    'Grimes'(): Map {
        // prettier-ignore
        return {
            name: 'Grimes',
            layout: [
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, G, G, G, G, W, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, D, D, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, G, G, G, M, M, G, G, G, G, G, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, D, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, G, G, M, M, M, M, M, M, M, M, M, M, M, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, D, D, W, W],
                [W, W, W, W, W, W, W, W, W, W, G, G, M, M, G, G, G, G, M, F, F, F, M, M, M, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, D, D, D, W, W, W],
                [W, W, W, W, W, W, W, W, W, F, F, M, M, G, G, M, G, G, G, G, G, G, G, G, M, F, F, F, F, F, F, W, W, W, W, W, W, W, W, W, W, W, W, W, D, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, F, F, F, G, G, M, M, M, M, F, F, F, F, F, F, M, M, M, M, F, F, F, F, D, D, W, W, W, W, W, W, W, W, W, W, D, D, W, W, W, W],
                [W, W, W, W, W, W, W, F, F, F, F, F, F, M, M, M, M, M, M, F, M, M, F, M, M, M, M, M, M, F, G, G, W, D, G, W, W, W, W, W, W, W, W, W, W, D, W, W, W, W],
                [W, W, W, W, W, W, F, F, F, F, F, F, F, F, F, D, 'Fernsworth', M, M, M, M, M, M, M, F, M, M, M, M, F, F, W, W, G, G, G, W, W, W, W, W, W, W, W, W, D, D, W, W, W],
                [W, W, W, W, W, G, G, G, G, G, G, G, F, F, D, D, M, M, F, F, F, F, F, F, G, F, M, M, F, G, G, W, G, G, G, G, G, G, G, G, G, G, W, W, W, W, D, G, W, W],
                [W, W, W, W, W, G, G, G, G, G, G, F, F, F, D, M, M, F, G, G, G, G, G, G, G, F, M, M, G, G, G, W, G, G, G, G, G, G, G, G, G, G, G, W, W, W, D, G, W, W],
                [W, W, W, W, W, W, G, G, G, G, G, G, F, F, D, M, F, F, G, G, G, G, G, G, G, G, M, M, G, G, G, W, G, G, G, G, G, F, G, G, G, F, F, F, W, D, G, G, W, W],
                [W, W, W, W, W, W, W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, M, M, F, G, G, G, W, W, W, W, G, G, F, F, G, F, F, 'Easthaven', G, W, D, G, G, W, W],
                [W, W, W, W, W, W, G, G, G, G, G, G, G, G, G, G, G, G, F, F, F, G, G, G, G, F, M, F, F, F, G, G, G, G, W, W, G, G, G, F, F, F, G, G, W, D, G, W, W, W],
                [W, W, W, W, W, W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, F, M, M, F, G, G, G, G, G, G, W, W, W, G, G, F, G, G, W, W, D, W, W, W, W],
                [W, W, W, W, W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, F, M, M, M, F, W, G, G, G, G, G, G, W, G, G, G, G, W, W, D, D, W, W, W, W],
                [W, W, W, W, W, G, G, G, G, G, M, G, G, G, G, G, G, G, G, G, W, W, W, W, W, W, M, M, M, W, W, W, W, W, G, G, D, W, W, W, W, W, W, D, D, W, W, W, W, W],
                [W, W, W, W, W, G, G, G, G, M, M, M, G, G, G, G, G, G, G, G, W, W, W, W, W, W, W, M, M, W, W, W, W, W, W, W, D, D, D, D, D, D, D, D, W, W, W, W, W, W],
                [W, W, W, W, G, G, G, G, M, M, F, F, G, G, G, G, G, G, G, G, W, W, W, W, W, W, W, M, M, M, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, G, G, G, M, M, M, F, F, G, G, G, G, G, G, G, G, W, W, W, W, W, W, W, W, W, M, M, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, F, M, M, F, F, F, F, G, G, G, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, G, F, F, 'Lava Grotto', F, G, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
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
