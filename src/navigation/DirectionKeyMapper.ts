import includes from 'lodash/includes';
import valuesIn from 'lodash/valuesIn';

enum DirectionKey {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  W = 'w',
  S = 's',
  A = 'a',
  D = 'd',
}

export const isDirectionKey = (key: string) =>
  includes(valuesIn(DirectionKey), key);

export const DirectionKeyMap: { [directionKey: string]: string } = {
  [DirectionKey.ArrowUp]: 'up',
  [DirectionKey.ArrowDown]: 'down',
  [DirectionKey.ArrowLeft]: 'left',
  [DirectionKey.ArrowRight]: 'right',
  [DirectionKey.W]: 'up',
  [DirectionKey.S]: 'down',
  [DirectionKey.A]: 'left',
  [DirectionKey.D]: 'right',
};
