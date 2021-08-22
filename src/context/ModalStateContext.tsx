import { createContext } from 'react';

export enum ModalEnum {
    PlayerStats = 'PlayerStats',
    FieldMenu = 'FieldMenu',
    Dialog = 'Dialog',
}

export interface ModalInterface {
    closeModal: (modalEnum: ModalEnum) => void;
    getModalContent: (modalEnum: ModalEnum) => any;
    isModalOpen: (modalEnum: ModalEnum) => boolean;
    openModal: (
        modalEnum: ModalEnum,
        content?: any,
        onClose?: () => void
    ) => void;
}

export const ModalStateContext = createContext<ModalInterface>({
    closeModal: () => {},
    getModalContent: () => {},
    isModalOpen: () => false,
    openModal: () => {},
});
