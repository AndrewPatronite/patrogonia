import { createContext } from 'react';
import Location from '../player/Location';

interface CharacterPositionStateManagement {
    characterPositions: { [index: string]: Location };
    updateCharacterPosition: (characterId: string, location: Location) => void;
    canMoveToPosition: (location: Location) => boolean;
    isCharacterTalking: (characterId: string) => boolean;
    setCharacterTalking: (characterId: string, isTalking: boolean) => void;
}

export const CharacterPositionContext = createContext<
    CharacterPositionStateManagement
>({
    characterPositions: {},
    canMoveToPosition: () => false,
    updateCharacterPosition: () => {},
    isCharacterTalking: () => false,
    setCharacterTalking: () => {},
});
