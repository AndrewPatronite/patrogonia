import React from 'react';
import ThemedPanel from '../components/theme/ThemedPanel';
import ThemedHeader from '../components/theme/ThemedHeader';
import { FaLinkedin } from 'react-icons/fa';
import {
  Button,
  Flex,
  Icon,
  Link,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { ColorMode } from '../theme';

const Credits = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  return (
    <>
      <Button variant="link" onClick={onOpen}>
        Credits
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ThemedPanel flexDirection="column">
            <ThemedHeader marginBottom="0">Created by</ThemedHeader>
            <label>Andrew Patronite</label>
            <Link
              isExternal
              href="https://www.linkedin.com/in/andrew-patronite-7640b186"
              color={colorMode === ColorMode.Light ? 'linkedin.700' : 'white'}
              width="4.5rem"
            >
              <Flex alignItems="center">
                Linked
                <Icon as={FaLinkedin} marginLeft="0.25rem" />
              </Flex>
            </Link>
            <Link isExternal href="mailto:patronite@gmail.com" width="10rem">
              patronite@gmail.com
            </Link>

            <ThemedHeader marginTop="2rem" marginBottom="0">
              Music
            </ThemedHeader>
            <label>Crusaderp</label>
            <Link
              isExternal
              href="https://soundcloud.com/crusaderp/sets/the-frontier"
              width="23.5rem"
            >
              https://soundcloud.com/crusaderp/sets/the-frontier
            </Link>

            <ThemedHeader marginTop="2rem" marginBottom="0">
              Battle sound effects
            </ThemedHeader>
            <label>James Tubbritt (Sharp)</label>
            <Link isExternal href="http://www.irishacts.com" width="11.5rem">
              http://www.irishacts.com
            </Link>

            <ThemedHeader marginTop="2rem" marginBottom="0" minWidth="25rem">
              Trumpet, spell, and dialogue sound effects
            </ThemedHeader>
            <Link isExternal href="https://www.zapsplat.com" width="12rem">
              https://www.zapsplat.com
            </Link>
          </ThemedPanel>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Credits;
