import Player from '../player/Player'

export const hasCompletedLesson = (player: Player, lesson: string) => {
  return !player || player?.completedLessons?.includes(lesson)
}

export const recordLesson = (
  player: Player,
  lesson: string,
  updatePlayer: (player: Player, updateToServer: boolean) => void
) => {
  if (hasCompletedLesson(player, lesson)) {
    return player
  } else {
    updatePlayer(
      {
        ...player,
        completedLessons: player.completedLessons.concat(lesson),
      },
      false
    )
  }
}
