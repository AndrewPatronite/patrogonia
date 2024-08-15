import React from 'react';
import { shallow } from 'enzyme';
import Character, { CharacterProps } from './Character';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { Direction } from '../navigation';
import { FaCampground, FaDragon, FaInfoCircle } from 'react-icons/fa';

describe('Character', () => {
  let props: CharacterProps;

  const getCharacter = (
    directionFacing: Direction = Direction.Up,
    battleId?: string,
    lastUpdate: string = new Date().toString(),
    isCurrentPlayer: boolean = false,
    inDialogRange: boolean = false
  ) => {
    props = {
      name: 'Redwan',
      directionFacing,
      battleId,
      lastUpdate,
      isCurrentPlayer,
      inDialogRange,
    };
    return shallow(<Character {...props} />);
  };

  it('is a Box with relative positioning', () => {
    const subject = getCharacter();
    expect(subject.type()).toEqual(Box);
    expect(subject.prop('position')).toEqual('relative');
  });

  it("has the right background image and shows a hero's name on back when facing up", () => {
    const subject = getCharacter(Direction.Up, undefined, undefined, true);
    expect(subject.find(Flex).prop('backgroundImage')).toEqual('hero-up.gif');
    expect(subject.text()).toEqual('Redwan');
  });

  it("has the right background image and shows a hero's name on chest when facing down", () => {
    const subject = getCharacter(Direction.Down, undefined, undefined, true);
    expect(subject.find(Flex).prop('backgroundImage')).toEqual('hero-down.gif');
    expect(subject.text()).toEqual('Redwan');
  });

  it('has the right background image for hero facing right', () => {
    const subject = getCharacter(Direction.Right, undefined, undefined, true);
    expect(subject.find(Flex).prop('backgroundImage')).toEqual(
      'hero-right.gif'
    );
  });

  it('has the right background image for hero facing left', () => {
    const subject = getCharacter(Direction.Left, undefined, undefined, true);
    expect(subject.find(Flex).prop('backgroundImage')).toEqual('hero-left.gif');
  });

  it("has the right background image and shows a peer's name on back when facing up", () => {
    const subject = getCharacter(Direction.Up);
    expect(subject.find(Flex).prop('backgroundImage')).toEqual('peer-up.gif');
    expect(subject.text()).toEqual('Redwan');
  });

  it("has the right background image and shows a peer's name on chest when facing down", () => {
    const subject = getCharacter(Direction.Down);
    expect(subject.find(Flex).prop('backgroundImage')).toEqual('peer-down.gif');
    expect(subject.text()).toEqual('Redwan');
  });

  it('has the right background image for peer facing right', () => {
    const subject = getCharacter(Direction.Right);
    expect(subject.find(Flex).prop('backgroundImage')).toEqual(
      'peer-right.gif'
    );
  });

  it('has the right background image for peer facing left', () => {
    const subject = getCharacter(Direction.Left);
    expect(subject.find(Flex).prop('backgroundImage')).toEqual('peer-left.gif');
  });

  it('shows a dragon icon if player is in battle', () => {
    const subject = getCharacter(Direction.Down, 'ff12ff34eeee');
    const icon = subject.find(Icon);
    expect(icon.props()).toEqual({
      as: FaDragon,
      color: 'black',
      height: '1.25rem',
      left: '0.3125rem',
      position: 'absolute',
      top: '0',
      width: '1.25rem',
    });
  });

  it('shows a camping icon if player is not in battle and idle', () => {
    const now = new Date();
    const lastUpdate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes() - 2
    );
    const subject = getCharacter(
      Direction.Down,
      undefined,
      lastUpdate.toString()
    );
    const icon = subject.find(Icon);
    expect(icon.props()).toEqual({
      as: FaCampground,
      color: 'black',
      height: '1.25rem',
      left: '0.3125rem',
      position: 'absolute',
      top: '0',
      width: '1.25rem',
    });
  });

  it('shows a dialog icon if player is in dialog range of an NPC', () => {
    const subject = getCharacter(
      Direction.Right,
      undefined,
      undefined,
      true,
      true
    );
    const icon = subject.find(Icon);
    expect(icon.props()).toEqual({
      as: FaInfoCircle,
      color: 'black',
      height: '1.25rem',
      left: '0.3125rem',
      position: 'absolute',
      top: '0',
      width: '1.25rem',
    });
  });

  it('shows no icons if player is not in battle and not idle', () => {
    const now = new Date();
    const lastUpdate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    );
    const subject = getCharacter(
      Direction.Down,
      undefined,
      lastUpdate.toString()
    );
    const icon = subject.find(Icon);
    expect(icon.exists()).toEqual(false);
  });
});
