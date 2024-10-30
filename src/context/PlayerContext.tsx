import { createContext } from 'react';
import { Player } from '../player';

interface PlayerState {
  castSpell: (spellName: string, targetId: string) => void;
  createAccount: (player: Partial<Player>) => void;
  currentPlayer: Player | null;
  loadPlayer: (playerId: number) => void;
  loadSave: (playerId: number) => void;
  login: (username: string, password: string) => void;
  updatePlayer: (
    player: Player,
    saveGame?: boolean,
    updateToServer?: boolean
  ) => void;
  updateInProgress: boolean;
}

const PlayerContext = createContext<PlayerState>({
  castSpell: () => {},
  createAccount: () => {},
  currentPlayer: null,
  loadPlayer: () => {},
  loadSave: () => {},
  login: () => {},
  updatePlayer: () => {},
  updateInProgress: false,
});

export default PlayerContext;
