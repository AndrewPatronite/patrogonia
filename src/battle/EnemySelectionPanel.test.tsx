import React from 'react';
import EnemySelectionPanel, {
  EnemySelectionPanelProps,
} from './EnemySelectionPanel';
import { Command, EnemyName } from './types';
import { Player } from '../player';
import { fireEvent, screen } from '@testing-library/react';
import { useModalState } from '../hooks';
import { renderChakra } from '../../test/utils';

jest.mock('../hooks', () => ({
  useModalState: jest.fn(),
}));

describe('EnemySelectionPanel', () => {
  let props: EnemySelectionPanelProps;

  beforeEach(() => {
    (useModalState as jest.Mock).mockReturnValue({
      isModalOpen: () => true,
      openModal: () => {},
      closeModal: () => {},
    });
    //@ts-expect-error missing Player fields
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
    renderChakra(<EnemySelectionPanel {...props} />);
  });

  it('has an action ThemedHeader', () => {
    expect(screen.getByTestId('themed-header').textContent).toEqual('Attack');
  });

  describe('OptionPanel', () => {
    it('is a list of enemies', () => {
      const optionPanel = screen.getByTestId('list');
      expect(optionPanel.children.length).toEqual(props.enemies.length);
      props.enemies.forEach((enemy, index) => {
        expect(optionPanel.children[index].textContent).toEqual(enemy.name);
      });
    });

    it('calls selectEnemy with the first living enemy', () => {
      expect(props.selectEnemy).toHaveBeenCalledWith('ffff12345');
    });

    it('forwards onBack call to the supplied handleBack', () => {
      const optionPanel = screen.getByTestId('list');
      fireEvent.keyDown(optionPanel, {
        key: 'Escape',
      });
      expect(props.handleBack).toHaveBeenCalled();
    });

    it('calls selectEnemy via OptionPanel change', () => {
      fireEvent.click(screen.getByTestId('aaaa12345'));
      expect(props.selectEnemy).toHaveBeenCalledWith('aaaa12345');
    });

    it('forwards onNext call to the supplied handleNext', () => {
      const optionPanel = screen.getByTestId('list');
      fireEvent.click(screen.getByTestId('ffff12345'));
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
