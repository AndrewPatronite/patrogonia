export enum BattleStatus {
  InProgress = 'IN_PROGRESS',
  Victory = 'VICTORY',
  Defeat = 'DEFEAT',
}

export const isBattleEnded = (status: BattleStatus) =>
  [BattleStatus.Victory, BattleStatus.Defeat].includes(status)
