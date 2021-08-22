import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';
import LinkButton from '../control/LinkButton';
import ThemedPanel from '../components/theme/ThemedPanel';
import './DialogModal.css';

const DialogModal = ({
    closeDialog,
    getDialog,
    showDialog,
}: {
    closeDialog: () => void;
    getDialog: () => any;
    showDialog: boolean;
}) => {
    const okButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        Modal.setAppElement('body');
    }, []);

    const modalStyle = {
        content: {
            top: '30%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(5%, 5%)',
        },
    };
    const { content = '', onClose = () => {} } = getDialog();
    const dismiss = () => {
        closeDialog();
        onClose();
    };
    return (
        <Modal
            className="dialog-modal"
            isOpen={showDialog}
            onAfterOpen={() => okButtonRef.current?.focus()}
            onRequestClose={() => {}}
            style={modalStyle}
        >
            <ThemedPanel flexDirection="column" width="200px">
                <span>{content}</span>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ marginTop: '10px', width: '30px' }}>
                        {
                            //@ts-ignore
                            <LinkButton
                                ref={okButtonRef}
                                className="ok-button"
                                onClick={dismiss}
                            >
                                OK
                            </LinkButton>
                        }
                    </div>
                </div>
            </ThemedPanel>
        </Modal>
    );
};

export default DialogModal;
