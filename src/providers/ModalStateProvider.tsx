import React, { ReactNode, useCallback, useState } from 'react';
import { ModalEnum, ModalInterface, ModalStateContext } from '../context';

interface ModalProps {
  modal: ModalEnum;
  content?: any;
  onClose: () => void;
}

const ModalStateProvider = ({ children }: { children: ReactNode }) => {
  const [openModal, setOpenModal] = useState<ModalProps | null>();
  const modalInterface: ModalInterface = {
    closeModal: useCallback((modalEnum: ModalEnum) => {
      setOpenModal((previous) =>
        previous?.modal === modalEnum ? null : previous
      );
    }, []),
    getModalContent: useCallback(() => {
      const content = openModal?.content;
      const onClose = openModal?.onClose ?? (() => {});
      return { content, onClose };
    }, [openModal?.content, openModal?.onClose]),
    isModalOpen: useCallback(
      (modalEnum: ModalEnum) => {
        return openModal?.modal === modalEnum;
      },
      [openModal?.modal]
    ),
    openModal: useCallback(
      (modalEnum: ModalEnum, content?: any, onClose: () => void = () => {}) =>
        setOpenModal((previous) =>
          previous
            ? previous
            : {
                modal: modalEnum,
                content,
                onClose,
              }
        ),
      []
    ),
  };
  return (
    <ModalStateContext.Provider value={modalInterface}>
      {children}
    </ModalStateContext.Provider>
  );
};

export default ModalStateProvider;
