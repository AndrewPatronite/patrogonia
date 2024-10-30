import { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Map } from '../maps';
import { getRandomDirection, moveNpc } from './helpers';
import { useMap } from './useMap';

const MOVEMENT_INTERVAL = 3000;

export const useNpcMovementEffect = (map?: Map) => {
  const [npcMoveList, setNpcMoveList] = useState<string[]>([]);
  const { npcs, canMoveToPosition, updateNpc } = useMap();
  const npcNames = npcs.map((npc) => npc.name);

  useEffect(() => {
    if (map) {
      npcMoveList.forEach((npcName) => {
        const npc = npcs.find((npc) => npc.name === npcName);
        if (npc && !npc.isTalking) {
          moveNpc(npc, getRandomDirection(), map, canMoveToPosition, updateNpc);
          setNpcMoveList((previousMoveList) =>
            previousMoveList.filter(
              (previousNpcName) => previousNpcName !== npcName
            )
          );
        }
      });
    }
  }, [map, npcMoveList, npcs, canMoveToPosition, updateNpc]);

  useEffect(() => {
    if (!isEmpty(npcNames)) {
      const movement = setInterval(() => {
        setNpcMoveList(npcNames);
      }, MOVEMENT_INTERVAL);
      return () => {
        clearInterval(movement);
      };
    }
  }, [npcNames]);
};
