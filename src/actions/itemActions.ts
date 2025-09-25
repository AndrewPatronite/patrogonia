import { Dispatch } from '@reduxjs/toolkit';
import {
  getShopInventory as getShopInventoryRemote,
  purchaseItem as purchaseItemRemote,
  sellItem as sellItemRemote,
  useItem as useItemRemote,
} from '../api';
import { Player } from '../player';
import { assemblePlayerForServer, dispatchAndStorePlayerUpdate } from './utils';
import { MapName } from '../environment/maps/types';
import { ShopType } from '../shop';
import { ItemDetails } from '../item';

export const getShopInventory = (
  mapName: MapName,
  shopType: ShopType,
  onSuccess: (inventory: ItemDetails[]) => void,
  onFailure: (error: any) => void
) => {
  getShopInventoryRemote(mapName, shopType, onSuccess, () =>
    onFailure('Failed to get shop inventory.')
  );
};

const handleUpdate = (currentPlayer: Player, dispatch: Dispatch) => (
  updatedPlayer: Player
) => {
  const mergedPlayer = {
    ...currentPlayer,
    ...updatedPlayer,
  };
  dispatchAndStorePlayerUpdate(dispatch, mergedPlayer);
  return Promise.resolve(mergedPlayer);
};

export const purchaseItem = (
  dispatch: Dispatch,
  currentPlayer: Player,
  itemName: string
): Promise<Player> =>
  purchaseItemRemote(assemblePlayerForServer(currentPlayer), itemName)
    .then(handleUpdate(currentPlayer, dispatch))
    .catch(() => Promise.reject('Failed to purchase item.'));

export const sellItem = (
  dispatch: Dispatch,
  currentPlayer: Player,
  itemId: number
): Promise<Player> =>
  sellItemRemote(assemblePlayerForServer(currentPlayer), itemId)
    .then(handleUpdate(currentPlayer, dispatch))
    .catch(() => Promise.reject('Failed to sell item.'));

export const useItem = (
  currentPlayer: Player,
  itemId: number,
  targetId?: string
): Promise<Player> =>
  useItemRemote(assemblePlayerForServer(currentPlayer), itemId, targetId)
    .then((updatedPlayer: Player) => {
      const mergedPlayer = {
        ...currentPlayer,
        ...updatedPlayer,
      };
      return Promise.resolve(mergedPlayer);
    })
    .catch(() => Promise.reject('Failed to use item.'));
