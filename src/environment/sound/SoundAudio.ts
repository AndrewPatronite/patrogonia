import {
  BattleMusic,
  CaveMusic,
  EnemyAttackSound,
  FieldMusic,
  HealingSound,
  IceSound,
  LevelUpSound,
  PartyDestroyedSound,
  PlayerAttackSound,
  Sound,
  TalkingSound,
  TownMusic,
  WarpSound,
} from '.';

const getLoopingAudio = (source: string) => {
  const audio = new Audio(source);
  audio.loop = true;
  return audio;
};

export const SoundAudio: { [key in Sound]: HTMLAudioElement } = {
  [Sound.FieldMusic]: getLoopingAudio(FieldMusic),
  [Sound.CaveMusic]: getLoopingAudio(CaveMusic),
  [Sound.TownMusic]: getLoopingAudio(TownMusic),
  [Sound.BattleMusic]: getLoopingAudio(BattleMusic),
  [Sound.PlayerAttack]: new Audio(PlayerAttackSound),
  [Sound.EnemyAttack]: new Audio(EnemyAttackSound),
  [Sound.LevelUp]: new Audio(LevelUpSound),
  [Sound.PartyDestroyed]: new Audio(PartyDestroyedSound),
  [Sound.Heal]: new Audio(HealingSound),
  [Sound.Ice]: new Audio(IceSound),
  [Sound.Warp]: new Audio(WarpSound),
  [Sound.Talking]: new Audio(TalkingSound),
};
