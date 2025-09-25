import pick from 'lodash/pick';
import { Player } from '../player';
import { Dispatch } from '@reduxjs/toolkit';
import { playerSlice } from '../redux';

export const assemblePlayerForServer = (player: Player) =>
  pick(
    player,
    'id',
    'battleId',
    'name',
    'username',
    'location',
    'stats',
    'visited',
    'spells',
    'tutorialLessons',
    'inventory'
  );

export const dispatchAndStorePlayerUpdate = (
  dispatch: Dispatch,
  updatedPlayer: Player
) => {
  dispatch(playerSlice.actions.setPlayer(updatedPlayer));
  localStorage.setItem('currentPlayer', JSON.stringify(updatedPlayer));
};
