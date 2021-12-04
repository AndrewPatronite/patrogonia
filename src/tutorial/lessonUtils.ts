import { Player } from '../player'

export const hasCompletedLesson = (player: Player, lesson: string) =>
  player.tutorialLessons.includes(lesson)

export const recordLesson = (
  player: Player,
  lesson: string,
  updatePlayer: (
    player: Player,
    saveGame?: boolean,
    updateToServer?: boolean
  ) => void
) => {
  if (hasCompletedLesson(player, lesson)) {
    return player
  } else {
    updatePlayer({
      ...player,
      tutorialLessons: player.tutorialLessons.concat(lesson),
    })
  }
}
