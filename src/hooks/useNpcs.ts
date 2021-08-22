import { useEffect, useMemo, useRef, useState } from 'react';
import { Maps } from '../environment/maps/Maps';
import { Direction, DirectionKeyMapper } from '../navigation';
import { useCharacterPositions } from './useCharacterPositions';
import Location from '../player/Location';
import { getDialog, Npc } from '../npcs';
import { entries, isEmpty } from 'lodash';
import { ModalEnum } from '../context/ModalStateContext';
import { useModalState } from './index';

interface Map {
    name: string;
    layout: string[][];
    npcs: Npc[];
}

const updateNpc = (
    npc: Npc,
    rowIndex: number,
    columnIndex: number,
    directionFacing: string,
    mapName: string,
    canMoveToPosition: (location: Location) => boolean,
    updateCharacterPosition: (characterId: string, location: Location) => void
) => {
    const nextLocation = {
        mapName,
        rowIndex,
        columnIndex,
        facing: directionFacing,
        entranceName: '',
    };

    if (canMoveToPosition(nextLocation)) {
        updateCharacterPosition(`npc-${npc.name}`, nextLocation);
        npc.currentColumnIndex = columnIndex;
        npc.currentRowIndex = rowIndex;
        npc.directionFacing = directionFacing;
    } else {
        npc.name === 'Nigel' && console.log("Can't move to position");
    }
};

const moveNpc = (
    npc: Npc,
    direction: Direction,
    { name: mapName, layout }: Map,
    canMoveToPosition: (location: Location) => boolean,
    updateCharacterPosition: (characterId: string, location: Location) => void
) => {
    const { up, down, left, right } = DirectionKeyMapper;
    const {
        currentRowIndex,
        currentColumnIndex,
        startingRowIndex,
        startingColumnIndex,
        movementRange,
    } = npc;

    switch (direction) {
        case Direction.up:
            if (
                currentRowIndex > 0 &&
                startingRowIndex - currentRowIndex < movementRange
            ) {
                npc.name === 'Nigel' && console.log(`${npc.name} move up`);
                updateNpc(
                    npc,
                    currentRowIndex - 1,
                    currentColumnIndex,
                    up,
                    mapName,
                    canMoveToPosition,
                    updateCharacterPosition
                );
            } else {
                npc.name === 'Nigel' &&
                    console.log(
                        `${npc.name} can't move up: startingRowIndex ${startingRowIndex} currentRowIndex ${currentRowIndex} movementRange ${movementRange}`
                    );
            }
            break;
        case Direction.down:
            if (
                currentRowIndex < layout.length - 1 &&
                currentRowIndex - startingRowIndex < movementRange
            ) {
                npc.name === 'Nigel' && console.log(`${npc.name} move down`);
                updateNpc(
                    npc,
                    currentRowIndex + 1,
                    currentColumnIndex,
                    down,
                    mapName,
                    canMoveToPosition,
                    updateCharacterPosition
                );
            } else {
                npc.name === 'Nigel' &&
                    console.log(
                        `${npc.name} can't move down startingRowIndex ${startingRowIndex} currentRowIndex ${currentRowIndex} movementRange ${movementRange}`
                    );
            }
            break;
        case Direction.left:
            if (
                currentColumnIndex > 0 &&
                startingColumnIndex - currentColumnIndex < movementRange
            ) {
                npc.name === 'Nigel' && console.log(`${npc.name} move left`);
                updateNpc(
                    npc,
                    currentRowIndex,
                    currentColumnIndex - 1,
                    left,
                    mapName,
                    canMoveToPosition,
                    updateCharacterPosition
                );
            } else {
                npc.name === 'Nigel' &&
                    console.log(
                        `${npc.name} can't move left startingColumnIndex ${startingColumnIndex} currentColumnIndex ${currentColumnIndex} movementRange ${movementRange}`
                    );
            }
            break;
        case Direction.right:
            if (
                currentColumnIndex < layout[currentRowIndex].length - 1 &&
                currentColumnIndex - startingColumnIndex < movementRange
            ) {
                npc.name === 'Nigel' && console.log(`${npc.name} move right`);
                updateNpc(
                    npc,
                    currentRowIndex,
                    currentColumnIndex + 1,
                    right,
                    mapName,
                    canMoveToPosition,
                    updateCharacterPosition
                );
            } else {
                npc.name === 'Nigel' &&
                    console.log(
                        `${npc.name} can't move right startingColumnIndex ${startingColumnIndex} currentColumnIndex ${currentColumnIndex} movementRange ${movementRange}`
                    );
            }
            break;
        default:
            break;
    }
};

const getRandomDirection = () => {
    const directionKeys = Object.keys(Direction);
    const randomKeyIndex = Math.floor(Math.random() * directionKeys.length);
    const directionMappings: { [key: string]: Direction } = {
        '0': Direction.up,
        '1': Direction.right,
        '2': Direction.down,
        '3': Direction.left,
    };
    return directionMappings[randomKeyIndex];
};

export const useNpcs = (mapName: string) => {
    const npcs = useRef<Npc[]>([]);
    const [npcMoveList, setNpcMoveList] = useState<string[]>([]);
    const {
        canMoveToPosition,
        characterPositions,
        isCharacterTalking,
        setCharacterTalking,
        updateCharacterPosition,
    } = useCharacterPositions();
    const { openModal } = useModalState();
    // @ts-ignore
    const map: Map = useMemo(() => (mapName ? Maps[mapName]() : {}), [mapName]);

    useEffect(() => {
        npcMoveList.forEach((npcName) => {
            const npc = npcs.current.find((npc) => npc.name === npcName);
            if (npc && !isCharacterTalking(`npc-${npc.name}`)) {
                moveNpc(
                    npc,
                    getRandomDirection(),
                    map,
                    canMoveToPosition,
                    updateCharacterPosition
                );
                setNpcMoveList((previousMoveList) =>
                    previousMoveList.filter(
                        (previousNpcName) => previousNpcName !== npcName
                    )
                );
            }
        });
    }, [
        canMoveToPosition,
        isCharacterTalking,
        map,
        npcMoveList,
        updateCharacterPosition,
    ]);

    useEffect(() => {
        entries(characterPositions).forEach(([characterId, { facing }]) => {
            const character = npcs.current.find(
                (npc) => characterId === `npc-${npc.name}`
            );
            if (character) {
                character.directionFacing = facing;
                if (isCharacterTalking(`npc-${character.name}`)) {
                    openModal(ModalEnum.Dialog, getDialog(character.name), () =>
                        setCharacterTalking(`npc-${character.name}`, false)
                    );
                }
            }
        });
    }, [
        characterPositions,
        isCharacterTalking,
        setCharacterTalking,
        openModal,
    ]);

    useEffect(() => {
        if (!isEmpty(map)) {
            npcs.current = map.npcs;
            const movement = setInterval(() => {
                setNpcMoveList(npcs.current.map((npc) => npc.name));
            }, 3000);
            return () => {
                clearInterval(movement);
            };
        }
    }, [map]);
    return npcs.current;
};
