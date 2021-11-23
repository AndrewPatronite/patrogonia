import { Flex, Modal, ModalContent } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import ThemedPanel from './theme/ThemedPanel'

interface CaptionModalProps {
  message: string | ReactNode
  isOpen: boolean
}

const CaptionModal = ({ message, isOpen }: CaptionModalProps) => (
  <Modal isOpen={isOpen} onClose={() => {}} size="full">
    <ModalContent background="transparent">
      <Flex
        alignItems="center"
        direction="column"
        height="62.5rem"
        justifyContent="flex-end"
        width="62.5rem"
      >
        <ThemedPanel
          alignItems="center"
          direction="column"
          marginBottom="2rem"
          padding="0.5rem"
        >
          {message}
        </ThemedPanel>
      </Flex>
    </ModalContent>
  </Modal>
)

export default CaptionModal
