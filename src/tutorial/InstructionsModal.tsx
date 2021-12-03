import React from 'react'
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react'
import ThemedPanel from '../components/theme/ThemedPanel'
import {
  BattleCommandLesson,
  FieldMenuLesson,
  MovementLesson,
  TownVisitLesson,
} from '../tutorial'
import NpcLesson from './NpcLesson'
import IntroductionLesson from '../tutorial/introduction/Introduction'
import CaveExplorationLesson from './CaveExplorationLesson'

interface LessonEntry {
  name: string
  lesson: () => JSX.Element
}

const Introduction = () => <IntroductionLesson isCompact={true} />

const InstructionsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const lessonEntries: LessonEntry[] = [
    {
      name: 'Introduction',
      lesson: Introduction,
    },
    {
      name: 'Movement',
      lesson: MovementLesson,
    },
    {
      name: 'Field menu',
      lesson: FieldMenuLesson,
    },
    {
      name: 'Saving/Healing',
      lesson: TownVisitLesson,
    },
    {
      name: 'Conversation',
      lesson: NpcLesson,
    },
    {
      name: 'Battle commands',
      lesson: () => (
        <BattleCommandLesson
          options={[
            { value: 'ATTACK', display: 'Attack' },
            { value: 'HEAL', display: 'Heal' },
            { value: 'ICE', display: 'Ice' },
            { value: 'PARRY', display: 'Parry' },
            { value: 'RUN', display: 'run' },
          ]}
        />
      ),
    },
    {
      name: 'Caves',
      lesson: CaveExplorationLesson,
    },
  ]

  return (
    <>
      <Button variant="link" onClick={onOpen}>
        Instructions
      </Button>
      <Modal isOpen={isOpen} isCentered={true} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ThemedPanel heading="Instructions" flexDirection="column">
            <Tabs orientation="vertical" width="100%" marginTop="0.5rem">
              <TabList>
                {lessonEntries.map(({ name }) => (
                  <Tab
                    key={name}
                    width="9.5rem"
                    justifyContent="flex-start"
                    paddingLeft="0.75rem"
                    paddingRight="0.25rem"
                  >
                    {name}
                  </Tab>
                ))}
              </TabList>
              <TabPanels>
                {lessonEntries.map(({ name, lesson: Lesson }) => (
                  <TabPanel
                    key={name}
                    display="flex"
                    justifyContent="center"
                    minHeight="20rem"
                  >
                    <Lesson />
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </ThemedPanel>
        </ModalContent>
      </Modal>
    </>
  )
}

export default InstructionsModal
