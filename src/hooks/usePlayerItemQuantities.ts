import { useMemo } from 'react';
import { Player } from '../player';

interface PlayerItemQuantities {
  [itemName: string]: number;
}

export const usePlayerItemQuantities = (currentPlayer: Player) =>
  useMemo(
    () =>
      currentPlayer?.inventory?.reduce(
        (accumulator: PlayerItemQuantities, { itemDetails: { name } }) => {
          return {
            ...accumulator,
            [name]: (accumulator[name] ?? 0) + 1,
          };
        },
        {}
      ),
    [currentPlayer?.inventory]
  );
