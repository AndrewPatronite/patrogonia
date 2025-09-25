import React, { useCallback, useEffect, useState } from 'react';
import ThemedPanel from '../components/theme/ThemedPanel';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import Typist from 'react-typist-component';
import { Sound } from '../environment/sound';
import { useSound } from '../hooks';

const DialogModal = ({
  closeDialog,
  getDialog,
  showDialog,
}: {
  closeDialog: () => void;
  getDialog: () => any;
  showDialog: boolean;
}) => {
  const { playSound, pauseSound } = useSound();
  const speak = useCallback(() => playSound(Sound.Talking), [playSound]);
  const pause = useCallback(() => pauseSound(Sound.Talking), [pauseSound]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    setTyping(showDialog);
    if (showDialog) {
      speak();
    }
  }, [showDialog, speak]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typing) {
        if (Math.floor(Math.random() * 2)) {
          pause();
          speak();
        }
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [pause, speak, typing]);

  const { content = '', onClose = () => {} } = getDialog();
  const dismiss = () => {
    closeDialog();
    onClose();
  };
  return (
    <Drawer size="sm" placement="left" onClose={onClose} isOpen={showDialog}>
      <DrawerOverlay />
      <DrawerContent
        background="transparent"
        boxShadow={0}
        paddingTop="1rem"
        paddingLeft="1rem"
      >
        <DrawerBody padding={0}>
          <ThemedPanel flexDirection="column">
            <Typist
              typingDelay={15}
              cursor=""
              onTypingDone={() => setTyping(false)}
            >
              {content}
            </Typist>
            {!typing && (
              <Button
                autoFocus
                alignSelf="flex-end"
                colorScheme="blue"
                marginTop="1rem"
                onClick={dismiss}
              >
                OK
              </Button>
            )}
          </ThemedPanel>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DialogModal;
