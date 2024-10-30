import { createContext } from 'react';

//eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface TutorialState {}

const TutorialContext = createContext<TutorialState>({});

export default TutorialContext;
