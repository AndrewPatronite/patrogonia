import { createContext } from 'react';
import { Player } from '../player';
import { SpellName } from '../player/types';

interface PlayerState {
  castSpell: (spellName: SpellName, targetId: string) => Promise<Player>;
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
  castSpell: () => Promise.reject('fff'),
  createAccount: () => {},
  currentPlayer: null,
  loadPlayer: () => {},
  loadSave: () => {},
  login: () => {},
  updatePlayer: () => {},
  updateInProgress: false,
});

export default PlayerContext;
