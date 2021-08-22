import { useContext } from 'react';
import { CharacterPositionContext } from '../context';

export const useCharacterPositions = () => {
    const {
        characterPositions,
        canMoveToPosition,
        isCharacterTalking,
        setCharacterTalking,
        updateCharacterPosition,
    } = useContext(CharacterPositionContext);

    return {
        characterPositions,
        canMoveToPosition,
        isCharacterTalking,
        setCharacterTalking,
        updateCharacterPosition,
    };
};
