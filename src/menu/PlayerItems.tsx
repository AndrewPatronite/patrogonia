import ThemedPanel from '../components/theme/ThemedPanel';
import { InventoryMap, Item, ItemName } from '../item';
import React, { useCallback, useMemo, useState } from 'react';
import { usePlayerItemQuantities, useSound } from '../hooks';
import { Player } from '../player';
import LabeledValue from '../components/LabeledValue';
import { Box, Button, Stack } from '@chakra-ui/react';
import { OptionPanel } from '../control';
import { isCave, isField, isTown } from '../environment/maps/Maps';
import { dispatchAndStorePlayerUpdate } from '../actions/utils';
import { Sound } from '../environment/sound';
import { useDispatch } from 'react-redux';
import Messages from './Messages';
import { useToastErrorHandler } from '../providers/useToastErrorHandler';
import ReturnOptions from './ReturnOptions';

const itemSounds: { [index: string]: Sound } = {
  [ItemName.HealthPotion]: Sound.Heal,
  [ItemName.DragonWings]: Sound.Warp,
  [ItemName.EscapePipe]: Sound.Warp,
};

interface PlayerItemsProps {
  currentPlayer: Player;
  items: Item[];
  onBack: () => void;
  useItem: (itemId: number, targetId?: string) => Promise<Player>;
  closeMenu: () => void;
}

const PlayerItems = ({
  currentPlayer,
  items,
  onBack,
  useItem,
  closeMenu,
}: PlayerItemsProps) => {
  const {
    location: { mapName: playerMapName },
    name: playerName,
    stats: { hp: playerHp, hpTotal: playerHpTotal },
    visited: visitedTowns,
  } = currentPlayer;
  const dispatch = useDispatch();
  const displayError = useToastErrorHandler();
  const { playSound } = useSound();
  const playerItemQuantities = usePlayerItemQuantities(currentPlayer);
  const itemOptions = useMemo(() => {
    const isItemDisabled = (itemName: string) => {
      switch (itemName) {
        case ItemName.HealthPotion:
          return playerHp === playerHpTotal;
        case ItemName.EscapePipe:
          return isField(playerMapName) || isTown(playerMapName);
        case ItemName.DragonWings:
          return isCave(playerMapName);
      }
    };

    const inventoryMap = items.reduce(
      (accumulator: InventoryMap, currentItem) => {
        const itemName = currentItem.itemDetails.name;
        if (!accumulator[itemName]) {
          accumulator[itemName] = [];
        }
        accumulator[itemName].push(currentItem);
        return accumulator;
      },
      {}
    );
    return Object.entries(inventoryMap).map(([itemName, items]) => ({
      display: itemName,
      value: items[0],
      disabled: isItemDisabled(itemName),
    }));
  }, [items, playerHp, playerHpTotal, playerMapName]);
  const [item, setItem] = useState<Item | null>(itemOptions[0].value);
  const [showTowns, setShowTowns] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const cleanUp = useCallback(() => {
    setItem(null);
    setShowTowns(false);
    setMessages([]);
    closeMenu();
  }, [closeMenu]);

  const use = useCallback(
    (item: Item, targetId?: string) => {
      // useItem is not a hook.
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useItem(item.id, targetId)
        .then((updatedPlayer: Player) => {
          const itemName = item.itemDetails.name;
          setMessages([
            `${playerName} used ${itemName}.`,
            ...(itemName === ItemName.HealthPotion
              ? [`HP ${updatedPlayer.stats.hp}/${updatedPlayer.stats.hpTotal}`]
              : []),
          ]);
          playSound(itemSounds[itemName]);
          setTimeout(() => {
            dispatchAndStorePlayerUpdate(dispatch, updatedPlayer);
            cleanUp();
          }, 4000);
        })
        .catch((error) => {
          displayError(error);
          cleanUp();
        });
    },
    [cleanUp, dispatch, displayError, playSound, playerName, useItem]
  );

  const handleItemNext = useCallback(
    (item: Item) => {
      if (item.itemDetails.name === ItemName.DragonWings) {
        setShowTowns(true);
      } else {
        use(item);
      }
    },
    [use]
  );

  const onTownNext = useCallback((town: string) => item && use(item, town), [
    item,
    use,
  ]);

  const handleTownBack = useCallback(() => {
    setShowTowns(false);
  }, []);

  return (
    <ThemedPanel
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
          {item && (
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
                    options={itemOptions}
                    value={item}
                    isBackEnabled={true}
                    onBack={onBack}
                    onChange={setItem}
                    onNext={handleItemNext}
                    width="8rem"
                    justifyItems="center"
                  />
                )}
                <span>{item.itemDetails.description}</span>
                <Stack gap="0.5rem">
                  <LabeledValue
                    label="Number held"
                    value={playerItemQuantities[item.itemDetails.name] || 0}
                    justifyContent="flex-start"
                    gap="1rem"
                  />
                  {item.itemDetails.name === ItemName.HealthPotion && (
                    <LabeledValue
                      label="HP"
                      value={`${playerHp}/${playerHpTotal}`}
                      isDisabled={playerHp === playerHpTotal}
                    />
                  )}
                </Stack>
              </Stack>
            </Box>
          )}
          <Button
            size="xs"
            variant="ghost"
            colorScheme="blue"
            alignSelf="flex-start"
            onClick={onBack}
          >{`<< Back`}</Button>
        </>
      )}
    </ThemedPanel>
  );
};

export default PlayerItems;
