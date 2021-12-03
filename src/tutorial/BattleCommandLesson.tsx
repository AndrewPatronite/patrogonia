import BattleOptionLesson from './BattleOptionLesson'
import React from 'react'
import { ListOption } from '../control/List'

const BattleCommandLesson = ({ options = [] }: { options: ListOption[] }) => (
  <BattleOptionLesson options={options} subject="command" />
)

export default BattleCommandLesson
