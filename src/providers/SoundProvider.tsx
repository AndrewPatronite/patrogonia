import { SoundContext } from '../context';
import React, { ReactNode, useCallback, useEffect } from 'react';
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
} from '../environment/sound';
import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';

const sounds: { [key in Sound]?: HTMLAudioElement } = {};

const SoundProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const getLoopingAudio = (source: string) => {
      const audio = new Audio(source);
      audio.loop = true;
      return audio;
    };

    if (isEmpty(sounds)) {
      sounds[Sound.FieldMusic] = getLoopingAudio(FieldMusic);
      sounds[Sound.CaveMusic] = getLoopingAudio(CaveMusic);
      sounds[Sound.TownMusic] = getLoopingAudio(TownMusic);
      sounds[Sound.BattleMusic] = getLoopingAudio(BattleMusic);
      sounds[Sound.PlayerAttacks] = new Audio(PlayerAttackSound);
      sounds[Sound.EnemyAttacks] = new Audio(EnemyAttackSound);
      sounds[Sound.LevelUp] = new Audio(LevelUpSound);
      sounds[Sound.PartyDestroyed] = new Audio(PartyDestroyedSound);
      sounds[Sound.Heal] = new Audio(HealingSound);
      sounds[Sound.Ice] = new Audio(IceSound);
      sounds[Sound.Warp] = new Audio(WarpSound);
      sounds[Sound.Talking] = new Audio(TalkingSound);
    }
  }, []);

  const pauseSound = useCallback((sound: Sound) => {
    try {
      sounds[sound]?.pause();
    } catch (e) {
      console.error(`Trouble pausing ${sound} sound: ${JSON.stringify(e)}`);
    }
  }, []);

  const playSound = useCallback((sound: Sound) => {
    const soundElement = sounds[sound];
    if (soundElement?.paused || soundElement?.ended) {
      if (soundElement.loop) {
        values(sounds)
          .filter((sound) => sound.loop)
          .forEach((music) => {
            if (music !== soundElement) {
              music.pause();
            }
          });
      }
      soundElement.currentTime = 0;
      soundElement.play().catch((e) => {
        if (e && e.code === 0 && e.name === 'NotAllowedError') {
          console.warn(
            `Can't play sound ${sound} since user hasn't interacted with the document yet`
          );
        } else {
          console.error(`Trouble playing ${sound} sound: ${JSON.stringify(e)}`);
        }
      });
    }
  }, []);

  const soundState = {
    pauseSound,
    playSound,
  };
  return (
    <SoundContext.Provider value={soundState}>{children}</SoundContext.Provider>
  );
};

export default SoundProvider;
