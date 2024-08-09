import BattleOptionLesson from './BattleOptionLesson';
import React from 'react';
import { ListOption } from '../control/List';

const BattleTargetLesson = ({ options = [] }: { options: ListOption[] }) => (
  <BattleOptionLesson options={options} subject="target" />
);

export default BattleTargetLesson;
