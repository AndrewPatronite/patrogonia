import { OptionPanel } from '../control';
import { MapName } from '../environment/maps/types';
import { ShopType } from './ShopType';
import PurchaseOptions from './PurchaseOptions';
import SellOptions from './SellOptions';
import { Player } from '../player';
import { ShopAction } from './ShopAction';
import { Item, ItemDetails } from '../item';
import { useMemo } from 'react';

interface ShopWizardProps {
  currentPlayer: Player;
  mapName: MapName;
  shopType: ShopType;
  action: ShopAction | null;
  onBack: () => void;
  onNext: (shopAction: ShopAction) => void;
  purchaseItem: (itemDetails: ItemDetails) => void;
  sellItem: (item: Item) => void;
  onClose: () => void;
}

const ShopWizard = ({
  currentPlayer,
  mapName,
  shopType,
  action,
  onBack,
  onNext,
  purchaseItem,
  sellItem,
  onClose,
}: ShopWizardProps) => {
  const shopOptions = useMemo(
    () => [
      {
        value: ShopAction.Buy,
        display: ShopAction.Buy,
      },
      {
        value: ShopAction.Sell,
        display: ShopAction.Sell,
        disabled: currentPlayer.inventory.length === 0,
      },
    ],
    [currentPlayer.inventory.length]
  );
  switch (action) {
    case ShopAction.Buy:
      return (
        <PurchaseOptions
          currentPlayer={currentPlayer}
          mapName={mapName}
          shopType={shopType}
          onBack={onBack}
          purchaseItem={purchaseItem}
        />
      );
    case ShopAction.Sell:
      return (
        <SellOptions
          currentPlayer={currentPlayer}
          onBack={onBack}
          sellItem={sellItem}
        />
      );
    case ShopAction.Exit:
      return null;
    default:
      return (
        <OptionPanel
          options={shopOptions}
          onBack={onClose}
          onNext={onNext}
          isBackEnabled={true}
          submitOnClick="single"
          width="8rem"
          justifyItems="center"
        />
      );
  }
};

export default ShopWizard;
