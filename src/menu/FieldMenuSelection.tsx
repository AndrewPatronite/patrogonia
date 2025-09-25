import { FieldMenuOption } from './FieldMenuOption';
import PlayerStatsPanel from '../player/PlayerStatsPanel';
import React from 'react';
import { Player } from '../player';
import PlayerSpells from './PlayerSpells';
import PlayerItems from './PlayerItems';
import { Item } from '../item';
import PlayerOptions from './PlayerOptions';
import { SpellName } from '../player/types';

interface FieldMenuSelectionProps {
  fieldMenuOption?: FieldMenuOption;
  currentPlayer: Player;
  onBack: () => void;
  castSpell: (spellName: SpellName, targetId: string) => Promise<Player>;
  playerItems: Item[];
  useItem: (itemId: number, targetId?: string) => Promise<Player>;
  closeMenu: () => void;
}

const FieldMenuSelection = ({
  fieldMenuOption,
  currentPlayer,
  onBack,
  castSpell,
  playerItems,
  useItem,
  closeMenu,
}: FieldMenuSelectionProps) => {
  switch (fieldMenuOption) {
    case FieldMenuOption.Stats:
      return (
        <PlayerStatsPanel
          playerStats={currentPlayer.stats}
          showHeading={false}
          includeBorder={false}
        />
      );
    case FieldMenuOption.Spells:
      return (
        <PlayerSpells
          currentPlayer={currentPlayer}
          onBack={onBack}
          castSpell={castSpell}
          closeMenu={closeMenu}
        />
      );
    case FieldMenuOption.Items:
      return (
        <PlayerItems
          currentPlayer={currentPlayer}
          items={playerItems}
          onBack={onBack}
          useItem={useItem}
          closeMenu={closeMenu}
        />
      );
    case FieldMenuOption.Options:
      return <PlayerOptions />;
    default:
      return null;
  }
};

export default FieldMenuSelection;
