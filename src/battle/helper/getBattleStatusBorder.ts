export const getBattleStatusBorder = (
  playerStats: { hp: number; hpTotal: number }[]
) => {
  const direThreshold = 0.2
  const status: { border?: string; borderRadius?: string } = {}
  let playerDied = false
  playerStats.forEach(({ hp, hpTotal }) => {
    if (!playerDied) {
      if (hp <= 0) {
        playerDied = true
        status.border = '2px solid black'
      } else if (hp / hpTotal <= direThreshold) {
        status.border = '2px solid #e31e2d'
      }
    }
  })
  return status
}
