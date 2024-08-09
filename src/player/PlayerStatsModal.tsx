import React from 'react';
import PlayerStatsPanel from './PlayerStatsPanel';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import { Stats } from './types';

export interface PlayerStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: Stats;
}

const PlayerStatsModal = ({
  isOpen,
  onClose,
  stats: playerStats,
}: PlayerStatsModalProps) => (
  <Drawer size="sm" placement="left" onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay />
    <DrawerContent
      background="transparent"
      boxShadow={0}
      paddingTop="1rem"
      paddingLeft="1rem"
    >
      <DrawerBody padding={0}>
        <PlayerStatsPanel playerStats={playerStats} />
      </DrawerBody>
    </DrawerContent>
  </Drawer>
);

export default PlayerStatsModal;
