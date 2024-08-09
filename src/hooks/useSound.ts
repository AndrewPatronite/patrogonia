import { useContext } from 'react';
import SoundContext from '../context/SoundContext';

export const useSound = () => useContext(SoundContext);
