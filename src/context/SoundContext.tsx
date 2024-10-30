import { createContext } from 'react';
import { Sound } from '../environment/sound';

interface SoundState {
  pauseSound: (sound: Sound) => void;
  playSound: (sound: Sound) => void;
}

const SoundContext = createContext<SoundState>({
  pauseSound: () => {},
  playSound: () => {},
});

export default SoundContext;
