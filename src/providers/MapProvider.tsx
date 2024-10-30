import MapContext from '../context/MapContext';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { usePlayer } from '../hooks';
import { subscribe } from '../subscription';
import { useToastErrorHandler } from './useToastErrorHandler';
import { getNpcs, getPlayers, updateNpc, updatePeerLocation } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import { canTraverse, isTown } from '../environment/maps/Maps';
import { Npc } from '../npcs';
import { Player } from '../player';
import {
  getLocationToPlayerMap,
  getMapDisplayRange,
} from '../environment/field/helper';
import { updateNpcLocation } from '../actions/mapActions';

const MapProvider = ({ children }: { children: ReactNode }) => {
  const playerUrl = `${process.env.NEXT_PUBLIC_WEBSOCKET_BASE_URL}/players`;
  const npcUrl = `${process.env.NEXT_PUBLIC_WEBSOCKET_BASE_URL}/npcs`;
  const { currentPlayer } = usePlayer();
  const [playerLocationMessage, setPlayerLocationMessage] = useState<
    Player | undefined
  >(undefined);
  const displayError = useToastErrorHandler();
  const dispatch = useDispatch();
  const { map, players, npcs } = useSelector(
    (state: RootState) => state.mapState
  );
  const mapNpcs = useMemo(
    () => npcs.filter(({ currentMapName }) => currentMapName === map?.name),
    [map?.name, npcs]
  );

  const {
    id: currentPlayerId,
    location: { mapName },
  } = currentPlayer ?? { location: {} };

  useEffect(() => {
    const playerLocationSubscription = subscribe(
      playerUrl,
      setPlayerLocationMessage
    );
    if (mapName) {
      getPlayers(dispatch, mapName, displayError);
    }
    return () => {
      playerLocationSubscription.close();
    };
  }, [dispatch, playerUrl, mapName, displayError]);

  useEffect(() => {
    const npcSubscription = subscribe(npcUrl, (npcLocation) => {
      updateNpcLocation(dispatch, npcLocation);
    });
    if (mapName) {
      getNpcs(dispatch, mapName, displayError);
    }
    return () => {
      npcSubscription.close();
    };
  }, [dispatch, npcUrl, mapName, displayError]);

  useEffect(() => {
    if (playerLocationMessage && playerLocationMessage.id !== currentPlayerId) {
      updatePeerLocation(dispatch, playerLocationMessage);
      setPlayerLocationMessage(undefined);
    }
  }, [dispatch, currentPlayerId, playerLocationMessage]);

  const locationToPlayerMap = useMemo(
    () =>
      currentPlayer
        ? getLocationToPlayerMap(players, currentPlayer)
        : undefined,
    [players, currentPlayer]
  );

  const canMoveToPosition = useCallback(
    (rowIndex: number, columnIndex: number, movementType: 'player' | 'npc') => {
      const isUnoccupied = () => {
        const blockedByPlayer =
          movementType === 'npc' &&
          (locationToPlayerMap
            ? locationToPlayerMap[`${rowIndex}-${columnIndex}`]?.length > 0
            : false);
        const occupiedByNpc = !!mapNpcs.find(
          ({ currentRowIndex, currentColumnIndex }) =>
            currentRowIndex === rowIndex && currentColumnIndex === columnIndex
        );
        return !(blockedByPlayer || occupiedByNpc);
      };

      const nextPosition = map?.layout[rowIndex][columnIndex];

      return (
        !!nextPosition &&
        canTraverse(nextPosition) &&
        (isTown(nextPosition) || isUnoccupied())
      );
    },
    [locationToPlayerMap, map?.layout, mapNpcs]
  );

  const mapDisplayRange = useMemo(
    () => (currentPlayer ? getMapDisplayRange(currentPlayer, map) : undefined),
    [currentPlayer, map]
  );

  const mapState = {
    map,
    npcs: mapNpcs,
    canMoveToPosition,
    locationToPlayerMap,
    mapDisplayRange,
    updateNpc: (npc: Npc) => updateNpc(dispatch, npc),
  };
  return <MapContext.Provider value={mapState}>{children}</MapContext.Provider>;
};

export default MapProvider;
