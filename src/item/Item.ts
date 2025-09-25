import { ItemDetails } from './ItemDetails';

export interface Item {
  id: number;
  itemDetails: ItemDetails;
  equipped: boolean;
}
