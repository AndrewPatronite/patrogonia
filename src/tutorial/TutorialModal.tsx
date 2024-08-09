import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  HStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import ThemedPanel from '../components/theme/ThemedPanel';
import { hasCompletedLesson } from './lessonUtils';
import { useModalState } from '../hooks';
import Character from '../player/Character';
import { Lesson } from './Lesson';
import { ModalEnum } from '../context';
import { Direction } from '../navigation';
import { Player } from '../player';

interface TutorialModalProps {
  player: Player;
  lesson: Lesson;
  lessonProps?: any;
  focusModal?: boolean;
}

const TutorialModal = ({
  player,
  lesson,
  lessonProps,
  focusModal = false,
}: TutorialModalProps) => {
  const { isModalOpen, openModal, closeModal } = useModalState();
  const NextLesson = hasCompletedLesson(player, lesson.name)
    ? null
    : lesson.component;

  useEffect(() => {
    if (NextLesson) {
      if (!isModalOpen(ModalEnum.Tutorial)) {
        openModal(ModalEnum.Tutorial);
      }
    } else {
      if (isModalOpen(ModalEnum.Tutorial)) {
        closeModal(ModalEnum.Tutorial);
      }
    }
  }, [NextLesson, closeModal, isModalOpen, openModal]);

  return (
    <Drawer
      size="sm"
      placement="top"
      trapFocus={focusModal}
      variant={focusModal ? undefined : 'noFocus'}
      isOpen={isModalOpen(ModalEnum.Tutorial)}
      onClose={() => {}}
    >
      <DrawerContent background="transparent" boxShadow={0}>
        <DrawerBody padding={0}>
          <Flex
            width="62.5rem"
            paddingTop="1rem"
            paddingLeft="1rem"
            paddingRight="1rem"
            justifyContent="flex-end"
          >
            {NextLesson && (
              <ThemedPanel>
                <HStack spacing="1rem">
                  <Character name="Redwan" directionFacing={Direction.Down} />
                  <NextLesson {...lessonProps} />
                </HStack>
              </ThemedPanel>
            )}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default TutorialModal;
