import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlayerContext } from '../context';
import { RootState } from '../redux';
import {
  castSpell,
  createAccount,
  loadPlayer,
  loadSave,
  login,
  updatePlayer as updatePlayerAction,
} from '../actions';
import { useToastErrorHandler } from './useToastErrorHandler';
import { Player } from '../player';
import isEqual from 'lodash/isEqual';

const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const displayError = useToastErrorHandler();
  const dispatch = useDispatch();
  const currentPlayer = useSelector((state: RootState) => state.currentPlayer);
  const [updateInProgress, setUpdateInProgress] = useState(false);

  const updatePlayer = useCallback(
    (player: Player, saveGame = false, updateToServer = true) => {
      if (!isEqual(player, currentPlayer)) {
        setUpdateInProgress(true);
        updatePlayerAction(
          dispatch,
          player,
          saveGame,
          updateToServer,
          (error) => {
            displayError(error);
            setUpdateInProgress(false);
          },
          () => setUpdateInProgress(false)
        );
      }
    },
    [currentPlayer, dispatch, displayError]
  );

  useEffect(() => {
    if (!currentPlayer) {
      const storedPlayer = localStorage.getItem('currentPlayer');

      if (storedPlayer) {
        updatePlayer(JSON.parse(storedPlayer), false, false);
      }
    }
  }, [currentPlayer, updatePlayer]);

  const playerState = {
    castSpell: useCallback(
      (spellName: string, targetId: string) =>
        currentPlayer &&
        castSpell(dispatch, currentPlayer, spellName, targetId, displayError),
      [dispatch, currentPlayer, displayError]
    ),
    createAccount: useCallback(
      (player: Partial<Player>) =>
        createAccount(dispatch, player, displayError),
      [dispatch, displayError]
    ),
    currentPlayer,
    loadPlayer: useCallback(
      (playerId: number) => loadPlayer(dispatch, playerId, displayError),
      [dispatch, displayError]
    ),
    loadSave: useCallback(
      (playerId: number) => loadSave(dispatch, playerId, displayError),
      [dispatch, displayError]
    ),
    login: useCallback(
      (username: string, password: string) =>
        login(dispatch, username, password, displayError),
      [dispatch, displayError]
    ),
    updatePlayer,
    updateInProgress,
  };
  return (
    <PlayerContext.Provider value={playerState}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
