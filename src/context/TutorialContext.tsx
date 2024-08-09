import { createContext } from 'react';

interface TutorialState {}

const TutorialContext = createContext<TutorialState>({});

export default TutorialContext;
