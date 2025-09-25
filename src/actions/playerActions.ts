import { Dispatch } from '@reduxjs/toolkit';
import {
  castSpell as castSpellRemote,
  createAccount as createAccountRemote,
  getPlayer,
  loadSave as loadSaveRemote,
  login as loginRemote,
  updatePlayer as updatePlayerRemote,
} from '../api';
import { Player } from '../player';
import { assemblePlayerForServer, dispatchAndStorePlayerUpdate } from './utils';

export const login = (
  dispatch: Dispatch,
  username: string,
  password: string,
  onFailure: (error: any) => void
) =>
  loginRemote(
    username,
    password,
    (loggedInPlayer: Player) =>
      updatePlayer(
        dispatch,
        {
          ...loggedInPlayer,
          loggedIn: true,
        },
        false,
        false,
        onFailure
      ),
    onFailure
  );

export const createAccount = (
  dispatch: Dispatch,
  player: Partial<Player>,
  onFailure: (error: any) => void
) =>
  createAccountRemote(
    player,
    (createdPlayer: Player) =>
      updatePlayer(
        dispatch,
        { ...createdPlayer, loggedIn: true },
        false,
        false,
        onFailure
      ),
    onFailure
  );

export const loadPlayer = (
  dispatch: Dispatch,
  playerId: number,
  onFailure: (error: any) => void
) =>
  getPlayer(
    playerId,
    (player: Player) =>
      dispatchAndStorePlayerUpdate(dispatch, { ...player, loggedIn: true }),
    onFailure
  );

export const loadSave = (
  dispatch: Dispatch,
  playerId: number,
  onFailure: (error: any) => void
) => {
  loadSaveRemote(
    playerId,
    () => loadPlayer(dispatch, playerId, onFailure),
    () => onFailure('Failed to load save. Try again or refresh the page.')
  );
};

export const updatePlayer = (
  dispatch: Dispatch,
  player: Player,
  saveGame: boolean,
  updateToServer: boolean,
  onFailure: (error: any) => void,
  onSuccess: () => void = () => {}
) => {
  if (updateToServer) {
    updatePlayerRemote(
      assemblePlayerForServer(player),
      saveGame,
      (updatedPlayer: Player) => {
        const mergedPlayer = {
          ...player,
          ...updatedPlayer,
        };
        dispatchAndStorePlayerUpdate(dispatch, mergedPlayer);
        onSuccess();
      },
      () => onFailure('Failed to update player. Try again or refresh the page.')
    );
  } else {
    dispatchAndStorePlayerUpdate(dispatch, player);
    onSuccess();
  }
};

export const castSpell = (
  currentPlayer: Player,
  spellName: string,
  targetId: string
): Promise<Player> => {
  return castSpellRemote(
    assemblePlayerForServer(currentPlayer),
    spellName,
    targetId
  )
    .then((updatedPlayer: Player) => {
      const mergedPlayer = {
        ...currentPlayer,
        ...updatedPlayer,
      };
      return Promise.resolve(mergedPlayer);
    })
    .catch(() =>
      Promise.reject('Failed to cast spell. Try again or refresh the page.')
    );
};
