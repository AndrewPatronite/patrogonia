import { useContext } from 'react';
import { ModalStateContext } from '../context';

export const useModalState = () => {
  const { closeModal, getModalContent, isModalOpen, openModal } = useContext(
    ModalStateContext
  );
  return {
    closeModal,
    getModalContent,
    isModalOpen,
    openModal,
  };
};
