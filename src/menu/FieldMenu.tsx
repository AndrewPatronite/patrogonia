import React, { useCallback, useMemo, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import ThemedPanel from '../components/theme/ThemedPanel';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Stack,
} from '@chakra-ui/react';
import { Player, SpellName } from '../player/types';
import { ItemCategory } from '../item';
import { OptionPanel } from '../control';
import { FieldMenuOption } from './FieldMenuOption';
import FieldMenuSelection from './FieldMenuSelection';
import { MenuState } from './MenuState';
import { useItem } from '../actions/itemActions';

interface FieldMenuProps {
  showFieldMenu: boolean;
  closeFieldMenu: () => void;
  currentPlayer: Player;
  castSpell: (spellName: SpellName, targetId: string) => Promise<Player>;
}

const FieldMenu = ({
  showFieldMenu,
  closeFieldMenu,
  currentPlayer,
  castSpell,
}: FieldMenuProps) => {
  const [menuState, setMenuState] = useState<MenuState<FieldMenuOption> | null>(
    null
  );
  const [transactionPending, setTransactionPending] = useState(false);

  const playerItems = useMemo(
    () =>
      currentPlayer.inventory.filter((item) =>
        [ItemCategory.Artifact, ItemCategory.Consumable].includes(
          item.itemDetails.category
        )
      ),
    [currentPlayer.inventory]
  );

  const menuOptions = useMemo(
    () => [
      { display: FieldMenuOption.Stats, value: FieldMenuOption.Stats },
      {
        display: FieldMenuOption.Spells,
        value: FieldMenuOption.Spells,
        disabled: isEmpty(
          currentPlayer.spells.filter((spell) => !spell.offensive)
        ),
      },
      {
        display: FieldMenuOption.Items,
        value: FieldMenuOption.Items,
        disabled: isEmpty(playerItems),
      },
      { display: FieldMenuOption.Options, value: FieldMenuOption.Options },
    ],
    [currentPlayer.spells, playerItems]
  );

  const showBackButton = useMemo(
    () =>
      !transactionPending &&
      (!menuState?.confirmed ||
        [FieldMenuOption.Stats, FieldMenuOption.Options].includes(
          menuState?.selection
        )),
    [menuState?.confirmed, menuState?.selection, transactionPending]
  );

  const heading = useMemo(
    () =>
      transactionPending
        ? ''
        : `Menu${menuState?.confirmed ? ` > ${menuState?.selection}` : ''}`,
    [menuState?.confirmed, menuState?.selection, transactionPending]
  );

  const handleClose = useCallback(() => {
    closeFieldMenu();
    setMenuState(null);
    setTransactionPending(false);
  }, [closeFieldMenu]);

  const handleBack = useCallback(() => {
    if (!transactionPending) {
      setMenuState((previous) => {
        const nextMenuState = previous?.confirmed
          ? { ...previous, confirmed: false }
          : null;
        if (!nextMenuState) {
          handleClose();
        }
        return nextMenuState;
      });
    }
  }, [handleClose, transactionPending]);

  const handleMenuNext = useCallback((menuOption: FieldMenuOption) => {
    setMenuState({ selection: menuOption, confirmed: true });
  }, []);

  const handleSpellCast = useCallback(
    (spellName: SpellName, targetId: string) => {
      setTransactionPending(true);
      return castSpell(spellName, targetId);
    },
    [castSpell]
  );

  const handleItemUse = useCallback(
    (itemId: number, targetId?: string) => {
      setTransactionPending(true);
      // useItem is not a hook.
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useItem(currentPlayer, itemId, targetId);
    },
    [currentPlayer]
  );

  return (
    <Drawer
      size="xs"
      placement="left"
      onClose={handleBack}
      isOpen={showFieldMenu}
      closeOnOverlayClick={false}
    >
      <DrawerOverlay />
      <DrawerContent
        background="transparent"
        boxShadow={0}
        paddingTop="1rem"
        paddingLeft="1rem"
      >
        <DrawerBody padding={0}>
          <ThemedPanel flexDirection="column" heading={heading}>
            <Box justifyItems="center">
              <Stack gap="2rem" width="100%" alignItems="center">
                {menuState?.confirmed ? (
                  <FieldMenuSelection
                    fieldMenuOption={menuState.selection}
                    currentPlayer={currentPlayer}
                    onBack={handleBack}
                    castSpell={handleSpellCast}
                    playerItems={playerItems}
                    useItem={handleItemUse}
                    closeMenu={handleClose}
                  />
                ) : (
                  <Box padding="1.5rem">
                    <OptionPanel
                      options={menuOptions}
                      value={menuState?.selection || FieldMenuOption.Stats}
                      onBack={handleBack}
                      onNext={handleMenuNext}
                      isBackEnabled={true}
                      submitOnClick="single"
                      width="8rem"
                    />
                  </Box>
                )}
                {showBackButton && (
                  <Button
                    size="xs"
                    variant="ghost"
                    colorScheme="blue"
                    alignSelf="flex-start"
                    onClick={handleBack}
                  >{`<< Back`}</Button>
                )}
              </Stack>
            </Box>
          </ThemedPanel>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default FieldMenu;
