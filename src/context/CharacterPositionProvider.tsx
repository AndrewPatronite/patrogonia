import React, { useState } from 'react';
import { entries, isEmpty } from 'lodash';
import { CharacterPositionContext } from './index';
import Location from '../player/Location';
import { Maps } from '../environment/maps/Maps';

interface CharacterPositions {
    [index: string]: Location;
}

const CharacterPositionProvider = ({ children }: { children: JSX.Element }) => {
    const [characterPositions, setCharacterPositions] = useState<
        CharacterPositions
    >({});
    const [talkingCharacters, setTalkingCharacters] = useState<string[]>([]);

    const updateCharacterPosition = (characterId: string, location: Location) =>
        setCharacterPositions((previousCharacterPositions) => ({
            ...previousCharacterPositions,
            [characterId]: location,
        }));

    const canMoveToPosition = ({
        mapName,
        rowIndex,
        columnIndex,
    }: Location) => {
        let canMove = false;
        if (!isEmpty(mapName)) {
            // @ts-ignore
            const map = Maps[mapName]();
            const nextPosition = map.layout[rowIndex][columnIndex];
            const isTraversable = Maps.canTraverse(nextPosition);
            const isTown = Maps.isTown(nextPosition);

            const isUnoccupied = () => {
                const characterEntriesAtLocation = entries(
                    characterPositions
                ).filter(
                    ([_, position]) =>
                        position.mapName === mapName &&
                        position.rowIndex === rowIndex &&
                        position.columnIndex === columnIndex
                );
                return isEmpty(characterEntriesAtLocation);
            };

            canMove = isTraversable && (isTown || isUnoccupied());
        }
        return canMove;
    };

    const isCharacterTalking = (characterId: string) =>
        talkingCharacters.includes(characterId);

    const setCharacterTalking = (characterId: string, isTalking: boolean) => {
        setCharacterPositions((previousCharacterPositions) => ({
            ...previousCharacterPositions,
            [characterId]: { ...previousCharacterPositions[characterId] },
        }));
        setTalkingCharacters((previousTalkingCharacters) =>
            isTalking
                ? previousTalkingCharacters.concat(characterId)
                : previousTalkingCharacters.filter(
                      (character) => character !== characterId
                  )
        );
    };

    const characterPositionStateManagement = {
        characterPositions,
        canMoveToPosition,
        updateCharacterPosition,
        isCharacterTalking,
        setCharacterTalking,
    };

    return (
        <CharacterPositionContext.Provider
            value={characterPositionStateManagement}
        >
            {children}
        </CharacterPositionContext.Provider>
    );
};

export default CharacterPositionProvider;
