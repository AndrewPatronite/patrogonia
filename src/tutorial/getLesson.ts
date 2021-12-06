import { Lesson } from './Lesson'
import BattleTargetLesson from './BattleTargetLesson'
import CaveExplorationLesson from './CaveExplorationLesson'
import {
  FieldMenuLesson,
  Introduction,
  LessonEnum,
  MovementLesson,
  NpcLesson,
  TownVisitLesson,
} from '.'
import BattleCommandLesson from './BattleCommandLesson'

export const getLesson = (lesson: LessonEnum) => {
  const lessons: { [key in LessonEnum]: Lesson } = {
    [LessonEnum.BattleCommandLesson]: {
      name: LessonEnum.BattleCommandLesson,
      component: BattleCommandLesson,
    },
    [LessonEnum.BattleTargetLesson]: {
      name: LessonEnum.BattleTargetLesson,
      component: BattleTargetLesson,
    },
    [LessonEnum.CaveExplorationLesson]: {
      name: LessonEnum.CaveExplorationLesson,
      component: CaveExplorationLesson,
    },
    [LessonEnum.FieldMenuLesson]: {
      name: LessonEnum.FieldMenuLesson,
      component: FieldMenuLesson,
    },
    [LessonEnum.Introduction]: {
      name: LessonEnum.Introduction,
      component: Introduction,
    },
    [LessonEnum.MovementLesson]: {
      name: LessonEnum.MovementLesson,
      component: MovementLesson,
    },
    [LessonEnum.NpcLesson]: {
      name: LessonEnum.NpcLesson,
      component: NpcLesson,
    },
    [LessonEnum.TownVisitLesson]: {
      name: LessonEnum.TownVisitLesson,
      component: TownVisitLesson,
    },
  }
  return lessons[lesson]
}
