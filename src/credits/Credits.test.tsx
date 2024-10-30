import React from 'react';
import Credits from './Credits';
import { fireEvent, screen } from '@testing-library/react';
import { renderChakra } from '../../test/utils';

describe('Credits', () => {
  beforeEach(() => {
    renderChakra(<Credits />);
  });

  it('has a LinkButton to show the credits modal', () => {
    expect(screen.getByRole('button').textContent).toEqual('Credits');
  });

  describe('Modal', () => {
    beforeEach(() => {
      fireEvent.click(screen.getByRole('button'));
    });

    const verifyLink = (link: Element, href: string) => {
      expect(link.getAttribute('href')).toEqual(href);
      expect(link.getAttribute('rel')).toEqual('noopener');
      expect(link.getAttribute('target')).toEqual('_blank');
    };

    it('has credits for the creator', () => {
      const heading = screen.getByRole('heading', { name: 'Created by' });
      expect(heading).toBeInTheDocument();
      expect(heading?.nextElementSibling?.textContent).toEqual(
        'Andrew Patronite'
      );
      verifyLink(
        screen.getByRole('link', {
          name: 'patronite@gmail.com',
        }),
        'mailto:patronite@gmail.com'
      );
      verifyLink(
        screen.getByRole('link', { name: 'Linked' }),
        'https://www.linkedin.com/in/andrew-patronite-7640b186'
      );
    });

    it('has credits for the Music', () => {
      const heading = screen.getByRole('heading', { name: 'Music' });
      expect(heading).toBeInTheDocument();
      expect(heading?.nextElementSibling?.textContent).toEqual('Crusaderp');
      verifyLink(
        screen.getByRole('link', {
          name: 'https://soundcloud.com/crusaderp/sets/the-frontier',
        }),
        'https://soundcloud.com/crusaderp/sets/the-frontier'
      );
    });

    it('has credits for the Battle sound effects', () => {
      const heading = screen.getByRole('heading', {
        name: 'Battle sound effects',
      });
      expect(heading).toBeInTheDocument();
      expect(heading?.nextElementSibling?.textContent).toEqual(
        'James Tubbritt (Sharp)'
      );
      verifyLink(
        screen.getByRole('link', { name: 'http://www.irishacts.com' }),
        'http://www.irishacts.com'
      );
    });

    it('has credits for the Trumpet sound effects', () => {
      const heading = screen.getByRole('heading', {
        name: 'Trumpet, spell, and dialogue sound effects',
      });
      expect(heading).toBeInTheDocument();
      verifyLink(
        screen.getByRole('link', { name: 'https://www.zapsplat.com' }),
        'https://www.zapsplat.com'
      );
    });
  });
});
