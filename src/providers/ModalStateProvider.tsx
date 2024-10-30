import React, { ReactNode, useCallback, useState } from 'react';
import { ModalEnum, ModalInterface, ModalStateContext } from '../context';

const ModalStateProvider = ({ children }: { children: ReactNode }) => {
  const [openModals, setOpenModals] = useState<
    { modal: ModalEnum; content?: any; onClose?: () => void }[]
  >([]);
  const modalInterface: ModalInterface = {
    closeModal: useCallback(
      (modalEnum: ModalEnum) =>
        setOpenModals((currentlyOpenModals) =>
          currentlyOpenModals.filter(
            (openModal) => openModal.modal !== modalEnum
          )
        ),
      []
    ),
    getModalContent: (modalEnum) => {
      const modalData = openModals.find(
        (openModal) => openModal.modal === modalEnum
      );
      const content = modalData?.content;
      const onClose = modalData ? modalData?.onClose : () => {};
      return { content, onClose };
    },
    isModalOpen: (modalEnum: ModalEnum) => {
      return openModals.some((openModal) => openModal.modal === modalEnum);
    },
    openModal: useCallback(
      (modalEnum: ModalEnum, content?: any, onClose: () => void = () => {}) =>
        setOpenModals((currentlyOpenModals) =>
          currentlyOpenModals.concat({
            modal: modalEnum,
            content,
            onClose,
          })
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
