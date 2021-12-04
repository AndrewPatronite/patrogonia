import MapContext from '../context/MapContext'
import React, { useCallback, useEffect, useState } from 'react'
import { usePlayer } from '../hooks'
import { subscribe } from '../subscription'
import { useToastErrorHandler } from './useToastErrorHandler'
import { getPlayers, updateNpc, updatePeerLocation } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux'
import { Maps } from '../environment/maps/Maps'
import { Npc } from '../npcs'
import { Player } from '../player'

const MapProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const playerUrl = `${process.env.REACT_APP_WEBSOCKET_BASE_URL}/players`
  const {
    currentPlayer: {
      id: currentPlayerId,
      location: {
        mapName,
        rowIndex: currentPlayerRowIndex,
        columnIndex: currentPlayerColumnIndex,
      },
    },
  } = usePlayer()
  const [playerLocationMessage, setPlayerLocationMessage] = useState<
    Player | undefined
  >(undefined)
  const displayError = useToastErrorHandler()
  const dispatch = useDispatch()
  const { map, players, npcs } = useSelector(
    (state: RootState) => state.mapState
  )

  useEffect(() => {
    const playerLocationSubscription = subscribe(
      playerUrl,
      setPlayerLocationMessage
    )
    if (mapName) {
      getPlayers(dispatch, mapName, displayError)
    }

    return () => {
      playerLocationSubscription.close()
    }
  }, [dispatch, playerUrl, mapName, displayError])

  useEffect(() => {
    if (playerLocationMessage && playerLocationMessage.id !== currentPlayerId) {
      updatePeerLocation(dispatch, playerLocationMessage)
      setPlayerLocationMessage(undefined)
    }
  }, [dispatch, currentPlayerId, playerLocationMessage])

  const canMoveToPosition = useCallback(
    (rowIndex, columnIndex) => {
      const nextPosition = map?.layout[rowIndex][columnIndex]
      const isTraversable = Maps.canTraverse(nextPosition)
      const isTown = Maps.isTown(nextPosition)

      const isUnoccupied = () => {
        const occupiedByCurrentPlayer =
          rowIndex === currentPlayerRowIndex &&
          columnIndex === currentPlayerColumnIndex
        const occupiedByNpc = !!npcs.find(
          ({ currentRowIndex, currentColumnIndex }) =>
            currentRowIndex === rowIndex && currentColumnIndex === columnIndex
        )
        return !(occupiedByCurrentPlayer || occupiedByNpc)
      }
      return isTraversable && (isTown || isUnoccupied())
    },
    [map, currentPlayerRowIndex, currentPlayerColumnIndex, npcs]
  )

  const mapState = {
    map,
    players,
    npcs,
    canMoveToPosition,
    updateNpc: (npc: Npc) => updateNpc(dispatch, npc),
  }
  return <MapContext.Provider value={mapState}>{children}</MapContext.Provider>
}

export default MapProvider
