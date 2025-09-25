import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ThemedPanel from '../components/theme/ThemedPanel';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import Typist from 'react-typist-component';
import { Sound } from '../environment/sound';
import { useSound } from '../hooks';
import { ShopType, ShopWizard } from '../shop';
import { Player } from '../player';
import { ShopAction } from '../shop/ShopAction';
import { useToastErrorHandler } from '../providers/useToastErrorHandler';
import { purchaseItem, sellItem } from '../actions';
import { useDispatch } from 'react-redux';
import { Item, ItemDetails } from '../item';

const shopGreeting: { [key in ShopType]: string } = {
  [ShopType.General]: 'Welcome to the item shop!',
  [ShopType.WeaponsAndArmor]: 'This shop sells weapons and armor.',
};

const shopDialog: { [key in ShopAction | 'Help' | 'Thanks']: string } = {
  [ShopAction.Buy]: 'What would you like to buy?',
  [ShopAction.Sell]: 'What would you like to sell?',
  [ShopAction.Exit]: 'Good day!',
  Help: 'How can I help you?',
  Thanks: 'Thank you!',
};

interface ShopModalProps {
  currentPlayer: Player;
  closeShop: () => void;
  getDialog: () => any;
  showDialog: boolean;
}

const ShopModal = ({
  currentPlayer,
  closeShop,
  getDialog,
  showDialog,
}: ShopModalProps) => {
  const { playSound, pauseSound } = useSound();
  const exchangeCoins = useCallback(() => playSound(Sound.Coins), [playSound]);
  const speak = useCallback(() => playSound(Sound.Talking), [playSound]);
  const pause = useCallback(() => pauseSound(Sound.Talking), [pauseSound]);
  const [typing, setTyping] = useState(false);
  const { content } = getDialog();
  const { mapName, shopType } = content ?? {};
  const [merchantDialog, setMerchantDialog] = useState<string>();
  const [action, setAction] = useState<ShopAction | null>(null);
  const dispatch = useDispatch();
  const displayError = useToastErrorHandler();
  const [transactionPending, setTransactionPending] = useState(false);

  const initialGreeting = useMemo(
    () => `${shopGreeting[shopType as ShopType]} ${shopDialog.Help}`,
    [shopType]
  );

  useEffect(() => {
    setMerchantDialog(initialGreeting);
  }, [initialGreeting]);

  useEffect(() => {
    setTyping(showDialog);
    if (showDialog) {
      speak();
    } else {
      setAction(null);
    }
  }, [showDialog, speak, merchantDialog, initialGreeting]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typing) {
        if (Math.floor(Math.random() * 2)) {
          pause();
          speak();
        }
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => {
      clearInterval(interval);
    };
  }, [pause, speak, typing]);

  const handleBack = useCallback(() => {
    setAction(null);
    setMerchantDialog(shopDialog.Help);
  }, []);

  const handleNext = useCallback((action: ShopAction) => {
    setAction(action);
    switch (action) {
      case ShopAction.Buy:
      case ShopAction.Sell:
        setMerchantDialog(shopDialog[action]);
        break;
      default:
    }
  }, []);

  const handleItemPurchase = useCallback(
    (itemDetails: ItemDetails) => {
      setTransactionPending(true);
      purchaseItem(dispatch, currentPlayer, itemDetails.name)
        .then(() => {
          exchangeCoins();
          setMerchantDialog(shopDialog.Thanks);
          setTimeout(() => setMerchantDialog(shopDialog.Buy), 1000);
        })
        .catch(displayError)
        .finally(() => setTransactionPending(false));
    },
    [currentPlayer, dispatch, displayError, exchangeCoins]
  );

  const handleSale = useCallback(
    (item: Item) => {
      setTransactionPending(true);
      sellItem(dispatch, currentPlayer, item.id)
        .then((updatedPlayer) => {
          exchangeCoins();
          setMerchantDialog(shopDialog.Thanks);
          setTimeout(() => setMerchantDialog(shopDialog.Sell), 1000);
          if (updatedPlayer.inventory.length === 0) {
            setTimeout(handleBack, 1000);
          }
        })
        .catch(displayError)
        .finally(() => setTransactionPending(false));
    },
    [currentPlayer, dispatch, displayError, exchangeCoins, handleBack]
  );

  const exit = useCallback(() => {
    setAction(ShopAction.Exit);
    setMerchantDialog(shopDialog.Exit);
    const timeout = setTimeout(closeShop, 1500);
    return () => clearTimeout(timeout);
  }, [closeShop]);

  const handleDrawerClose = useCallback(() => {
    switch (action) {
      case ShopAction.Buy:
      case ShopAction.Sell:
        handleBack();
        break;
      case ShopAction.Exit:
      default:
        exit();
    }
  }, [action, exit, handleBack]);

  const handleBackClick = useCallback(
    () =>
      [`${ShopAction.Buy}`, `${ShopAction.Sell}`].includes(`${action}`)
        ? handleBack()
        : exit(),
    [action, exit, handleBack]
  );

  return (
    <Drawer
      size="sm"
      placement="left"
      closeOnOverlayClick={false}
      onClose={handleDrawerClose}
      isOpen={showDialog}
    >
      <DrawerOverlay />
      <DrawerContent
        background="transparent"
        boxShadow={0}
        paddingTop="1rem"
        paddingLeft="1rem"
      >
        <DrawerBody padding={0}>
          <ThemedPanel flexDirection="column" gap="2rem">
            {merchantDialog && (
              <Typist
                key={merchantDialog}
                typingDelay={15}
                cursor=""
                onTypingDone={() => setTyping(false)}
              >
                <p>
                  {merchantDialog}
                  <br />
                </p>
              </Typist>
            )}
            {!typing &&
              !transactionPending &&
              merchantDialog !== shopDialog.Thanks && (
                <>
                  <ShopWizard
                    currentPlayer={currentPlayer}
                    mapName={mapName}
                    shopType={shopType}
                    action={action}
                    onBack={handleBack}
                    onNext={handleNext}
                    purchaseItem={handleItemPurchase}
                    sellItem={handleSale}
                    onClose={exit}
                  />
                  {action !== ShopAction.Exit && (
                    <Button
                      size="xs"
                      variant="ghost"
                      colorScheme="blue"
                      alignSelf="flex-start"
                      onClick={handleBackClick}
                    >{`<< Back`}</Button>
                  )}
                </>
              )}
          </ThemedPanel>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ShopModal;
