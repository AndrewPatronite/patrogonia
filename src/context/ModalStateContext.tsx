import { createContext } from 'react';

export enum ModalEnum {
  PlayerStats = 'PlayerStats',
  FieldMenu = 'FieldMenu',
  Dialog = 'Dialog',
  Tutorial = 'Tutorial',
  Shop = 'Shop',
}

export interface ModalInterface {
  closeModal: (modalEnum: ModalEnum) => void;
  getModalContent: () => any;
  isModalOpen: (modalEnum: ModalEnum) => boolean;
  openModal: (
    modalEnum: ModalEnum,
    content?: any,
    onClose?: () => void
  ) => void;
}

const ModalStateContext = createContext<ModalInterface>({
  closeModal: () => {},
  getModalContent: () => null,
  isModalOpen: () => false,
  openModal: () => {},
});

export default ModalStateContext;
