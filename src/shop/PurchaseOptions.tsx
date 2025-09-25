import { OptionPanel } from '../control';
import React, { useEffect, useState } from 'react';
import { useToastErrorHandler } from '../providers/useToastErrorHandler';
import { MapName } from '../environment/maps/types';
import { ShopType } from './ShopType';
import { getShopInventory } from '../actions/itemActions';
import { ItemDetails } from '../item';
import { Player } from '../player';
import { Flex } from '@chakra-ui/react';
import TransactionInfo from './TransactionInfo';
import { ShopAction } from './ShopAction';

interface PurchaseOption {
  value: ItemDetails;
  display: string;
  disabled?: boolean;
}

interface PurchaseOptionsProps {
  currentPlayer: Player;
  mapName: MapName;
  shopType: ShopType;
  onBack: () => void;
  purchaseItem: (itemDetails: ItemDetails) => void;
}

const PurchaseOptions = ({
  currentPlayer,
  mapName,
  shopType,
  onBack,
  purchaseItem,
}: PurchaseOptionsProps) => {
  const displayError = useToastErrorHandler();
  const [purchaseOptions, setPurchaseOptions] = useState<PurchaseOption[]>([]);
  const playerGold = currentPlayer.stats.gold;
  const [selectedItem, setSelectedItem] = useState<ItemDetails>();

  useEffect(() => {
    const applyPurchaseOptions = (inventory: ItemDetails[]) => {
      setPurchaseOptions(
        inventory.map((itemDetails) => ({
          value: itemDetails,
          display: itemDetails.name,
          disabled: itemDetails.value > playerGold,
        }))
      );
      if (inventory.length > 0) {
        setSelectedItem(inventory[0]);
      }
    };

    getShopInventory(mapName, shopType, applyPurchaseOptions, displayError);
  }, [displayError, mapName, playerGold, shopType]);

  return purchaseOptions.length > 0 ? (
    <Flex gap="2rem">
      <OptionPanel
        options={purchaseOptions}
        onBack={onBack}
        onChange={setSelectedItem}
        onNext={purchaseItem}
        isBackEnabled={true}
        width="8rem"
      />
      {selectedItem && (
        <TransactionInfo
          currentPlayer={currentPlayer}
          shopAction={ShopAction.Buy}
          item={selectedItem}
        />
      )}
    </Flex>
  ) : null;
};

export default PurchaseOptions;
