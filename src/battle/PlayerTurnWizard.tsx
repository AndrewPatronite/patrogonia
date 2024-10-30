import React, { useMemo, useState } from 'react';
import filter from 'lodash/filter';
import upperFirst from 'lodash/upperFirst';
import CommandPanel from './CommandPanel';
import EnemySelectionPanel from './EnemySelectionPanel';
import PlayerSelectionPanel from './PlayerSelectionPanel';
import { LessonEnum, recordLesson } from '../tutorial';
import { Command, Enemy } from './types';
import { Player, Spell, Stats } from '../player';

export interface PlayerTurnWizardProps {
  currentPlayer: Player;
  players: Stats[];
  enemies: Enemy[];
  selectEnemy: (enemyId?: string) => void;
  takeTurn: (action: string, targetId?: string | number) => void;
  selectedEnemyId?: string;
  playerTurnEnabled: boolean;
  mp: number;
  updatePlayer: (
    player: Player,
    saveGame?: boolean,
    updateToServer?: boolean
  ) => void;
}

const PlayerTurnWizard = ({
  currentPlayer,
  players,
  enemies,
  selectEnemy,
  takeTurn,
  selectedEnemyId,
  playerTurnEnabled,
  mp,
  updatePlayer,
}: PlayerTurnWizardProps) => {
  const [action, setAction] = useState<Command | Spell>();
  const livingEnemies = useMemo(
    () => filter(enemies, (enemy) => enemy.stats.hp > 0),
    [enemies]
  );
  const handleBack = () => {
    selectEnemy(undefined);
    setAction(undefined);
  };
  const handleCommand = (command: Command | Spell) => {
    recordLesson(currentPlayer, LessonEnum.BattleCommandLesson, updatePlayer);
    switch (command) {
      case Command.Parry:
      case Command.Run:
        takeTurn(command);
        break;
      case Command.Attack:
        if (livingEnemies.length > 1) {
          setAction(command);
        } else {
          takeTurn(command, livingEnemies[0].id);
        }
        break;
      default: {
        const spell = command;
        const { spellName, offensive } = spell;
        const formattedSpellName = upperFirst(spellName.toLowerCase());
        if (offensive) {
          if (livingEnemies.length > 1) {
            setAction(spell);
          } else {
            takeTurn(formattedSpellName, livingEnemies[0].id);
          }
        } else {
          if (players.length > 1) {
            setAction(spell);
          } else {
            takeTurn(formattedSpellName, currentPlayer.id);
          }
        }
      }
    }
  };

  switch (action) {
    case undefined:
      return (
        <CommandPanel
          currentPlayer={currentPlayer}
          handleCommand={handleCommand}
          mp={mp}
        />
      );
    case Command.Attack:
      return (
        <EnemySelectionPanel
          currentPlayer={currentPlayer}
          enemies={livingEnemies}
          action={action}
          handleBack={handleBack}
          handleNext={(targetId: string) => {
            recordLesson(
              currentPlayer,
              LessonEnum.BattleTargetLesson,
              updatePlayer
            );
            takeTurn(action, targetId);
          }}
          selectEnemy={selectEnemy}
          selectedEnemyId={selectedEnemyId}
          playerTurnEnabled={playerTurnEnabled}
        />
      );
    case Command.Parry:
    case Command.Run:
      return null;
    default: {
      const { spellName, offensive } = action;
      const formattedSpellName = upperFirst(spellName.toLowerCase());
      return offensive ? (
        <EnemySelectionPanel
          currentPlayer={currentPlayer}
          enemies={livingEnemies}
          action={formattedSpellName}
          handleBack={handleBack}
          handleNext={(targetId: string) => {
            recordLesson(
              currentPlayer,
              LessonEnum.BattleTargetLesson,
              updatePlayer
            );
            takeTurn(formattedSpellName, targetId);
          }}
          selectEnemy={selectEnemy}
          selectedEnemyId={selectedEnemyId}
          playerTurnEnabled={playerTurnEnabled}
        />
      ) : (
        <PlayerSelectionPanel
          players={players}
          action={formattedSpellName}
          handleBack={handleBack}
          handleNext={(targetId: number) =>
            takeTurn(formattedSpellName, targetId)
          }
          isBackEnabled={true}
        />
      );
    }
  }
};

export default PlayerTurnWizard;
