import { createContext } from 'react';
import { getInitialPlayer } from '../redux';
import { Player } from '../player';

interface PlayerState {
  castSpell: (spellName: string, targetId: string) => void;
  createAccount: (player: Partial<Player>) => void;
  currentPlayer: Player;
  loadPlayer: (playerId: number) => void;
  loadSave: (playerId: number) => void;
  login: (username: string, password: string) => void;
  updatePlayer: (
    player: Player,
    saveGame?: boolean,
    updateToServer?: boolean
  ) => void;
}

const PlayerContext = createContext<PlayerState>({
  castSpell: () => {},
  createAccount: () => {},
  currentPlayer: getInitialPlayer(),
  loadPlayer: () => {},
  loadSave: () => {},
  login: () => {},
  updatePlayer: () => {},
});

export default PlayerContext;
