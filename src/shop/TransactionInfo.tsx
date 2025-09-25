import LabeledValue from '../components/LabeledValue';
import { Stack } from '@chakra-ui/react';
import React from 'react';
import { ItemDetails } from '../item';
import { Player } from '../player';
import { ShopAction } from './ShopAction';
import { usePlayerItemQuantities } from '../hooks';

interface TransactionInfoProps {
  currentPlayer: Player;
  shopAction: ShopAction;
  item: ItemDetails;
}

const TransactionInfo = ({
  currentPlayer,
  shopAction,
  item,
}: TransactionInfoProps) => {
  const playerItemQuantities = usePlayerItemQuantities(currentPlayer);
  const playerGold = currentPlayer.stats.gold;

  return (
    <Stack gap="0.5rem" width="100%">
      <LabeledValue
        label={shopAction === ShopAction.Buy ? 'Cost' : 'Offer'}
        value={
          shopAction === ShopAction.Buy ? item.value : Math.ceil(item.value / 2)
        }
      />
      <LabeledValue
        label="Player gold"
        value={playerGold}
        isDisabled={shopAction === ShopAction.Buy && item.value > playerGold}
      />
      <LabeledValue
        label="Number held"
        value={playerItemQuantities[item.name] || 0}
      />
      <span>{item.description}</span>
    </Stack>
  );
};

export default TransactionInfo;
