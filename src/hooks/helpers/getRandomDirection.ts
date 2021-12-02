import { Direction } from '../../navigation'

export const getRandomDirection = () => {
  const directionKeys = Object.keys(Direction)
  const randomKeyIndex = Math.floor(Math.random() * directionKeys.length)
  const directionMappings: { [key: string]: Direction } = {
    '0': Direction.up,
    '1': Direction.right,
    '2': Direction.down,
    '3': Direction.left,
  }
  return directionMappings[randomKeyIndex]
}
