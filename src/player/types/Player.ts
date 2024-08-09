import Spell from './Spell';
import Stats from './Stats';
import Location from './Location';

export default interface Player {
  id: number;
  name: string;
  loggedIn: boolean;
  battleId?: string;
  spells: Spell[];
  stats: Stats;
  location: Location;
  lastUpdate: string;
  visited: string[];
  tutorialLessons: string[];
}
