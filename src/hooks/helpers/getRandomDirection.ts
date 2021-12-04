import { Direction } from '../../navigation'

export const getRandomDirection = () => {
  const directionKeys = Object.keys(Direction)
  const randomKeyIndex = Math.floor(Math.random() * directionKeys.length)
  const directionMappings: { [key: string]: Direction } = {
    '0': Direction.Up,
    '1': Direction.Right,
    '2': Direction.Down,
    '3': Direction.Left,
  }
  return directionMappings[randomKeyIndex]
}
