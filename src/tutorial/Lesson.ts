import { FunctionComponent } from 'react'
import { LessonEnum } from './introduction/LessonEnum'

export interface Lesson {
  name: LessonEnum
  component: FunctionComponent
}
