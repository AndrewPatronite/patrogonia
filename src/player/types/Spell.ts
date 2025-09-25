import { SpellName } from './SpellName';

export default interface Spell {
  spellName: SpellName;
  mpCost: number;
  offensive: boolean;
  battleSpell: boolean;
}
