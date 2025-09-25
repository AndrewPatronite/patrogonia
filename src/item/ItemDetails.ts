import { ItemCategory } from './ItemCategory';
import { ItemName } from './ItemName';

export interface ItemDetails {
  name: ItemName;
  category: ItemCategory;
  description: string;
  value: number;
}
