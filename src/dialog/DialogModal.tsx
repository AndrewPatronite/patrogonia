import React, { useState } from 'react'
import ThemedPanel from '../components/theme/ThemedPanel'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react'
import Typist from 'react-typist'
import { Sound } from '../environment/sound'
import { useSound } from '../hooks'
import { debounce } from 'lodash'

const DialogModal = ({
  closeDialog,
  getDialog,
  showDialog,
}: {
  closeDialog: () => void
  getDialog: () => any
  showDialog: boolean
}) => {
  const { playSound } = useSound()
  const speak = debounce(() => playSound(Sound.Talking), 30)
  const [typing, setTyping] = useState(false)
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
            <Typist
              avgTypingDelay={10}
              stdTypingDelay={15}
              cursor={{ show: false }}
              onCharacterTyped={() => {
                speak()
                setTyping(true)
              }}
              onTypingDone={() => setTyping(false)}
            >
              <span>{content}</span>
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
  )
}

export default DialogModal
