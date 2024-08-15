import { LessonEnum } from './LessonEnum';

export interface Lesson {
  name: LessonEnum;
  component: (lessonProps?: any) => JSX.Element;
}
