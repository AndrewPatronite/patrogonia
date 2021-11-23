import React from 'react'
import ThemedPanel from '../components/theme/ThemedPanel'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react'

const DialogModal = ({
  closeDialog,
  getDialog,
  showDialog,
}: {
  closeDialog: () => void
  getDialog: () => any
  showDialog: boolean
}) => {
  const { content = '', onClose = () => {} } = getDialog()
  const dismiss = () => {
    closeDialog()
    onClose()
  }
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
            <span>{content}</span>
            <Button
              alignSelf="flex-end"
              colorScheme="blue"
              marginTop="1rem"
              onClick={dismiss}
            >
              OK
            </Button>
          </ThemedPanel>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default DialogModal
