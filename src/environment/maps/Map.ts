import Entrance from './Entrance';

export default interface Map {
    name: string,
    layout: string[][],
    entrance: Entrance
}
