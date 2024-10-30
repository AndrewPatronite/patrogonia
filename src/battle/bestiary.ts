import { EnemyName } from './types';

export const bestiary: {
  [key in EnemyName]: string;
} = {
  [EnemyName.Mouse]: '/images/enemies/mouse.svg',
  [EnemyName.Boar]: '/images/enemies/boar.svg',
  [EnemyName.Goblin]: '/images/enemies/goblin.svg',
  [EnemyName.Knight]: '/images/enemies/knight.svg',
  [EnemyName.Rat]: '/images/enemies/rat.svg',
  [EnemyName.Skeleton]: '/images/enemies/skeleton.svg',
};
