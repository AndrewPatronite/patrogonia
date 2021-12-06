import { createContext } from 'react'

export enum ModalEnum {
  PlayerStats = 'PlayerStats',
  FieldMenu = 'FieldMenu',
  Dialog = 'Dialog',
  Tutorial = 'Tutorial',
}

export interface ModalInterface {
  closeModal: (modalEnum: ModalEnum) => void
  getModalContent: (modalEnum: ModalEnum) => any
  isModalOpen: (modalEnum: ModalEnum) => boolean
  openModal: (modalEnum: ModalEnum, content?: any, onClose?: () => void) => void
}

const ModalStateContext = createContext<ModalInterface>({
  closeModal: () => {},
  getModalContent: () => {},
  isModalOpen: () => false,
  openModal: () => {},
})

export default ModalStateContext
