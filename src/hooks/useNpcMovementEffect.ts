import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { Map } from '../environment/maps'
import { useMap } from '.'
import { getRandomDirection, moveNpc } from './helpers'

export const useNpcMovementEffect = (map?: Map) => {
  const [npcMoveList, setNpcMoveList] = useState<string[]>([])
  const { npcs, canMoveToPosition, updateNpc } = useMap()
  const npcNames = npcs.map((npc) => npc.name)

  useEffect(() => {
    if (map) {
      npcMoveList.forEach((npcName) => {
        const npc = npcs.find((npc) => npc.name === npcName)
        if (npc && !npc.isTalking) {
          moveNpc(npc, getRandomDirection(), map, canMoveToPosition, updateNpc)
          setNpcMoveList((previousMoveList) =>
            previousMoveList.filter(
              (previousNpcName) => previousNpcName !== npcName
            )
          )
        }
      })
    }
  }, [map, npcMoveList, npcs, canMoveToPosition, updateNpc])

  useEffect(() => {
    if (!isEmpty(npcNames)) {
      const movement = setInterval(() => {
        setNpcMoveList(npcNames)
      }, 3000)
      return () => {
        clearInterval(movement)
      }
    }
  }, [npcNames])
}
