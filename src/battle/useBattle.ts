import { useContext } from 'react';
import BattleContext from '../context/BattleContext';

export const useBattle = () => useContext(BattleContext);
