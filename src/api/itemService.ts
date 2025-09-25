import axios from 'axios';
import { Player } from '../player';
import { HttpStatus } from './types';
import { MapName } from '../environment/maps/types';
import { ShopType } from '../shop';
import { ItemDetails } from '../item';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/item`,
  headers: { 'Content-Type': 'application/json' },
});

export const getShopInventory = (
  mapName: MapName,
  shopType: ShopType,
  onSuccess: (itemDetail: ItemDetails[]) => void,
  onFailure: (error: any) => void
) => {
  return axiosInstance
    .get(
      `/getShopInventory/${mapName
        .toUpperCase()
        .replaceAll(' ', '_')}/${shopType}`
    )
    .then((response) => {
      if (response.status === HttpStatus.Ok) {
        onSuccess(response.data);
      }
    })
    .catch((error) => onFailure(error));
};

export const purchaseItem = (
  player: Partial<Player>,
  itemName: string
): Promise<Player> =>
  axiosInstance.put(`/purchaseItem/${itemName}`, player).then((response) => {
    if (response.status === HttpStatus.Ok) {
      return response.data;
    }
  });

export const sellItem = (
  player: Partial<Player>,
  itemId: number
): Promise<Player> =>
  axiosInstance.put(`/sellItem/${itemId}`, player).then((response) => {
    if (response.status === HttpStatus.Ok) {
      return response.data;
    }
  });

export const useItem = (
  player: Partial<Player>,
  itemId: number,
  targetId?: string
): Promise<Player> =>
  axiosInstance
    .put(
      targetId ? `/useItem/${itemId}/${targetId}` : `/useItem/${itemId}`,
      player
    )
    .then((response) => {
      if (response.status === HttpStatus.Ok) {
        return response.data;
      }
    });
