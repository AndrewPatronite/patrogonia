import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  HStack,
} from '@chakra-ui/react'
import React, { FunctionComponent, useEffect } from 'react'
import ThemedPanel from '../components/theme/ThemedPanel'
import Player from '../player/Player'
import { hasCompletedLesson } from './lessonUtils'
import { useModalState } from '../hooks'
import { ModalEnum } from '../context/ModalStateContext'
import Character from '../player/Character'

interface TutorialModalProps {
  player: Player
  lessons: FunctionComponent[]
}

const TutorialModal = ({ player, lessons }: TutorialModalProps) => {
  const { isModalOpen, openModal, closeModal } = useModalState()
  const NextLesson = lessons.find(
    (lesson) => !hasCompletedLesson(player, lesson.name)
  )

  useEffect(() => {
    if (NextLesson) {
      if (!isModalOpen(ModalEnum.Tutorial)) {
        openModal(ModalEnum.Tutorial)
      }
    } else {
      if (isModalOpen(ModalEnum.Tutorial)) {
        closeModal(ModalEnum.Tutorial)
      }
    }
  }, [NextLesson, closeModal, isModalOpen, openModal])

  return (
    <Drawer
      size="sm"
      placement="top"
      trapFocus={false}
      variant="noFocus"
      isOpen={isModalOpen(ModalEnum.Tutorial)}
      onClose={() => {}}
    >
      <DrawerContent
        background="transparent"
        boxShadow={0}
        paddingTop="1rem"
        paddingLeft="1rem"
      >
        <DrawerBody padding={0}>
          <Flex width="62.5rem" justifyContent="flex-end">
            {NextLesson && (
              <ThemedPanel marginRight="2rem">
                <HStack spacing="1rem">
                  <Character
                    player={{
                      name: 'Redwan',
                      //@ts-ignore
                      location: { facing: 'down' },
                      isCurrentPlayer: false,
                    }}
                  />
                  <NextLesson />
                </HStack>
              </ThemedPanel>
            )}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default TutorialModal
