import React, { useMemo, useState } from 'react';
import { OptionPanel } from '../control';
import { Player } from '../player';
import TransactionInfo from './TransactionInfo';
import { ShopAction } from './ShopAction';
import { Flex } from '@chakra-ui/react';
import { InventoryMap, Item } from '../item';

interface SellOptionsProps {
  currentPlayer: Player;
  onBack: () => void;
  sellItem: (item: Item) => void;
}

const SellOptions = ({ currentPlayer, onBack, sellItem }: SellOptionsProps) => {
  const [selectedItem, setSelectedItem] = useState<Item>();
  const sellOptions = useMemo(() => {
    const inventoryMap = currentPlayer.inventory.reduce(
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
    const sellOptions = Object.entries(inventoryMap).map(
      ([itemName, items]) => ({
        display: itemName,
        value: items[0],
      })
    );
    if (sellOptions.length > 0) {
      setSelectedItem(sellOptions[0].value);
    }
    return sellOptions;
  }, [currentPlayer.inventory]);

  return sellOptions.length > 0 ? (
    <Flex gap="2rem">
      <OptionPanel
        options={sellOptions}
        onBack={onBack}
        onChange={setSelectedItem}
        onNext={sellItem}
        isBackEnabled={true}
        width="8rem"
      />
      {selectedItem && (
        <TransactionInfo
          currentPlayer={currentPlayer}
          shopAction={ShopAction.Sell}
          item={selectedItem.itemDetails}
        />
      )}
    </Flex>
  ) : null;
};

export default SellOptions;
