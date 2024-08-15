import React from 'react';
import EnemySelectionPanel, {
  EnemySelectionPanelProps,
} from './EnemySelectionPanel';
import OptionPanel from './OptionPanel';
import { Command, EnemyName } from './types';
import { Player } from '../player';
import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';
import { useModalState } from '../hooks';

jest.mock('../hooks', () => ({
  useModalState: jest.fn(),
}));

describe('EnemySelectionPanel', () => {
  let props: EnemySelectionPanelProps;
  let renderResult: RenderResult;

  beforeEach(() => {
    (useModalState as jest.Mock).mockReturnValue({
      isModalOpen: () => true,
      openModal: () => {},
      closeModal: () => {},
    });
    //@ts-ignore missing Player fields
    const currentPlayer: Player = { id: 1, name: 'Andy', tutorialLessons: [] };
    props = {
      currentPlayer,
      enemies: [
        { id: 'ffff12345', name: EnemyName.Skeleton, stats: { hp: 20 } },
        { id: 'aaaa12345', name: EnemyName.Knight, stats: { hp: 20 } },
      ],
      action: Command.Attack,
      handleBack: jest.fn(),
      handleNext: jest.fn(),
      selectEnemy: jest.fn(),
      selectedEnemyId: undefined,
      playerTurnEnabled: true,
    };
    renderResult = render(<EnemySelectionPanel {...props} />);
  });

  it('has an action ThemedHeader', () => {
    expect(screen.getByRole('heading').textContent).toEqual('Attack');
  });

  describe('OptionPanel', () => {
    it('is a list of enemies', () => {
      const optionPanel = screen.getByRole('listbox');
      expect(optionPanel.children.length).toEqual(props.enemies.length);
      props.enemies.forEach((enemy, index) => {
        expect(optionPanel.children[index].textContent).toEqual(enemy.name);
      });
    });

    it('calls selectEnemy with the first living enemy', () => {
      expect(props.selectEnemy).toHaveBeenCalledWith('ffff12345');
    });

    it('forwards onBack call to the supplied handleBack', () => {
      const optionPanel = screen.getByRole('listbox');
      fireEvent.keyDown(optionPanel, {
        key: 'Escape',
      });
      expect(props.handleBack).toHaveBeenCalled();
    });

    it('calls selectEnemy via OptionPanel change', () => {
      fireEvent.click(screen.getByRole('button', { name: EnemyName.Knight }));
      expect(props.selectEnemy).toHaveBeenCalledWith('aaaa12345');
    });

    it('forwards onNext call to the supplied handleNext', () => {
      const optionPanel = screen.getByRole('listbox');
      fireEvent.click(screen.getByRole('button', { name: EnemyName.Skeleton }));
      fireEvent.keyDown(optionPanel, {
        key: 'Enter',
      });
      expect(props.handleNext).toHaveBeenCalledWith('ffff12345');
    });

    it('has a battle targeting lesson', () => {
      const content = screen.getByRole('dialog').textContent!;
      expect(content.includes('Choose a target:')).toEqual(true);
      expect(content.includes('Press Enter to confirm the target.')).toEqual(
        true
      );
    });
  });
});
