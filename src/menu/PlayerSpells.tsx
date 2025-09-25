import React, { useCallback, useMemo, useState } from 'react';
import upperFirst from 'lodash/upperFirst';
import ThemedPanel from '../components/theme/ThemedPanel';
import { Box, Button, Stack } from '@chakra-ui/react';
import { Sound } from '../environment/sound';
import { Player, Spell, SpellName } from '../player/types';
import { useSound } from '../hooks';
import { OptionPanel } from '../control';
import { MenuState } from './MenuState';
import { useDispatch } from 'react-redux';
import { dispatchAndStorePlayerUpdate } from '../actions/utils';
import LabeledValue from '../components/LabeledValue';
import { isCave, isField, isTown } from '../environment/maps/Maps';
import ReturnOptions from './ReturnOptions';
import Messages from './Messages';

const spellSounds: { [index: string]: Sound } = {
  [SpellName.Heal]: Sound.Heal,
  [SpellName.Return]: Sound.Warp,
  [SpellName.Outside]: Sound.Warp,
};

export interface PlayerSpellsProps {
  currentPlayer: Player;
  onBack: () => void;
  castSpell: (spellName: SpellName, targetId: string) => Promise<Player>;
  closeMenu: () => void;
}

const PlayerSpells = ({
  currentPlayer: {
    id: currentPlayerId,
    location: { entranceName, mapName: playerMapName },
    visited: visitedTowns,
    name: playerName,
    stats: { hp: playerHp, hpTotal: playerHpTotal, mp: playerMp },
    spells: playerSpells,
  },
  onBack,
  castSpell,
  closeMenu,
}: PlayerSpellsProps) => {
  const dispatch = useDispatch();
  const { pauseSound, playSound } = useSound();
  const spellOptions = useMemo(() => {
    const isSpellDisabled = (spell: Spell) => {
      if (spell.mpCost > playerMp) {
        return true;
      }
      switch (spell.spellName) {
        case SpellName.Heal:
          return playerHp === playerHpTotal;
        case SpellName.Outside:
          return isField(playerMapName) || isTown(playerMapName);
        case SpellName.Return:
          return isCave(playerMapName);
      }
    };
    return playerSpells
      .filter((spell) => !spell.offensive)
      .map((fieldSpell) => ({
        value: fieldSpell,
        display: upperFirst(fieldSpell.spellName.toLowerCase()),
        disabled: isSpellDisabled(fieldSpell),
      }));
  }, [playerHp, playerHpTotal, playerMapName, playerMp, playerSpells]);
  const [spellState, setSpellState] = useState<MenuState<Spell>>({
    selection: spellOptions[0].value,
    confirmed: false,
  });
  const [messages, setMessages] = useState<string[]>([]);

  const spellValue = useMemo(
    () =>
      spellOptions.find(
        ({ value: { spellName } }) =>
          spellName === spellState.selection.spellName
      )?.value,
    [spellOptions, spellState.selection.spellName]
  );

  const cleanUp = useCallback(() => {
    setSpellState({
      selection: spellOptions[0].value,
      confirmed: false,
    });
    setMessages([]);
    closeMenu();
  }, [closeMenu, spellOptions]);

  const cast = useCallback(
    (spellName: SpellName, spellTarget: string) => {
      castSpell(spellName, spellTarget)
        .then((updatedPlayer: Player) => {
          setMessages([
            `${playerName} cast ${upperFirst(spellName.toLowerCase())}.`,
            ...(spellName === SpellName.Heal
              ? [`HP ${updatedPlayer.stats.hp}/${updatedPlayer.stats.hpTotal}`]
              : []),
          ]);
          pauseSound(spellSounds[spellName]);
          playSound(spellSounds[spellName]);
          setTimeout(() => {
            dispatchAndStorePlayerUpdate(dispatch, updatedPlayer);
            cleanUp();
          }, 4000);
        })
        .catch(cleanUp);
    },
    [castSpell, cleanUp, playerName, pauseSound, playSound, dispatch]
  );

  const handleSpellBack = useCallback(() => {
    onBack();
    setSpellState({
      selection: spellOptions[0].value,
      confirmed: false,
    });
  }, [onBack, spellOptions]);

  const handleSpellChange = useCallback((spell: Spell) => {
    setSpellState({
      selection: spell,
      confirmed: false,
    });
  }, []);

  const handleSpellNext = useCallback(
    (spell: Spell) => {
      setSpellState({
        selection: spell,
        confirmed: true,
      });
      const { spellName } = spell;
      switch (spellName) {
        case SpellName.Heal:
          cast(spellName, `${currentPlayerId}`);
          break;
        case SpellName.Outside:
          cast(spellName, entranceName);
          break;
        default:
      }
    },
    [cast, currentPlayerId, entranceName]
  );

  const onTownNext = useCallback(
    (town: string) => cast(SpellName.Return, town),
    [cast]
  );

  const handleTownBack = useCallback(() => {
    setSpellState((previous) => ({ ...previous, confirmed: false }));
  }, []);

  const showTowns = useMemo(
    () =>
      spellState.confirmed &&
      spellState.selection.spellName === SpellName.Return,
    [spellState.confirmed, spellState.selection.spellName]
  );
  return (
    <ThemedPanel
      className="player-spells"
      flexDirection="column"
      includeBorder={false}
      alignItems="center"
      gap="2rem"
      paddingBottom="0"
    >
      {messages.length > 0 ? (
        <Messages messages={messages} />
      ) : (
        <>
          <Box minWidth="15rem" justifyItems="center" alignContent="flex-end">
            <Stack gap="1rem">
              {showTowns ? (
                <ReturnOptions
                  visitedTowns={visitedTowns}
                  onTownBack={handleTownBack}
                  onTownNext={onTownNext}
                />
              ) : (
                <OptionPanel
                  options={spellOptions}
                  value={spellValue}
                  isBackEnabled={true}
                  onBack={handleSpellBack}
                  onChange={handleSpellChange}
                  onNext={handleSpellNext}
                  width="8rem"
                />
              )}
              <Stack gap="0.5rem">
                <LabeledValue
                  label="MP"
                  value={`${spellState.selection.mpCost}/${playerMp}`}
                  isDisabled={spellState.selection.mpCost > playerMp}
                />
                {spellState.selection.spellName === SpellName.Heal && (
                  <LabeledValue
                    label="HP"
                    value={`${playerHp}/${playerHpTotal}`}
                    isDisabled={playerHp === playerHpTotal}
                  />
                )}
              </Stack>
            </Stack>
          </Box>
          <Button
            size="xs"
            variant="ghost"
            colorScheme="blue"
            alignSelf="flex-start"
            onClick={showTowns ? handleTownBack : handleSpellBack}
          >{`<< Back`}</Button>
        </>
      )}
    </ThemedPanel>
  );
};

export default PlayerSpells;
