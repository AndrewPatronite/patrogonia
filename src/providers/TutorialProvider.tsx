import { ModalEnum, TutorialContext } from '../context';
import React, { useEffect, useState } from 'react';
import { getLesson, Lesson, LessonEnum, TutorialModal } from '../tutorial';
import { isTown } from '../environment/maps/Maps';
import { useModalState, usePlayer } from '../hooks';
import { ContinentName } from '../environment/maps/types';

const TutorialProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { currentPlayer, updatePlayer } = usePlayer();
  const {
    loggedIn,
    battleId,
    location: { mapName },
    tutorialLessons,
  } = currentPlayer;
  const [nextLesson, setNextLesson] = useState<Lesson>();
  const { isModalOpen } = useModalState();

  const isDialogOpen = isModalOpen(ModalEnum.Dialog);
  const canShowLesson = loggedIn && !battleId && !isDialogOpen;

  useEffect(() => {
    const loadNextLesson = () => {
      const nextLesson = [
        getLesson(LessonEnum.Introduction),
        getLesson(LessonEnum.MovementLesson),
        getLesson(
          isTown(mapName) ? LessonEnum.NpcLesson : LessonEnum.TownVisitLesson
        ),
        getLesson(LessonEnum.FieldMenuLesson),
        ...(mapName === ContinentName.Atoris
          ? [getLesson(LessonEnum.CaveExplorationLesson)]
          : []),
      ].find(
        ({ name: lessonName }) =>
          !tutorialLessons.find(
            (completedLesson) => lessonName === completedLesson
          )
      );
      if (nextLesson) {
        setNextLesson(nextLesson);
      }
    };
    const interval = setInterval(() => {
      if (canShowLesson) {
        loadNextLesson();
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [canShowLesson, mapName, tutorialLessons]);

  const lessonProps = {
    currentPlayer,
    updatePlayer,
  };

  return (
    <TutorialContext.Provider value={{}}>
      {children}
      {canShowLesson && nextLesson && (
        <TutorialModal
          player={currentPlayer}
          lesson={nextLesson}
          lessonProps={lessonProps}
          focusModal={nextLesson.name === LessonEnum.Introduction}
        />
      )}
    </TutorialContext.Provider>
  );
};

export default TutorialProvider;
