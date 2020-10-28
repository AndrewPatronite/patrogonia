import React, { useCallback, useEffect, useState } from 'react';
import { find, isEmpty, sortBy, upperFirst } from 'lodash';
import Player from './Player';
import OptionPanel from '../battle/OptionPanel';
import { playSound } from '../environment/sound/sound';
import Spell from './Spell';
import ThemedPanel from '../components/theme/ThemedPanel';
import Row from '../components/Row';

const healingSound = require('../environment/sound/zapsplat/zapsplat_fantasy_magic_mystery_glissando_bell_43990.mp3');
const warpSound = require('../environment/sound/zapsplat/magic_spell_ascending_metallic_pad.mp3');

const PlayerSpells = ({
    currentPlayer: {
        id: currentPlayerId,
        location: { entranceName },
        visited,
        name: playerName,
        stats: { mp: playerMp },
    },
    availableSpells,
    onBack,
    castSpell,
}: {
    currentPlayer: Player;
    availableSpells: Spell[];
    onBack: () => void;
    castSpell: (spellName: string, targetId: string) => void;
}) => {
    const [spellCast, setSpellCast] = useState<{
        name?: string;
        targetId?: string;
        confirmed?: boolean;
    }>({});
    const spellOptions: object[] = [];
    availableSpells.forEach((spell) =>
        spellOptions.push({
            value: spell.spellName,
            display: upperFirst(spell.spellName.toLowerCase()),
        })
    );

    const setSpell = (
        selectedSpell?: string,
        targetId?: string,
        confirmed?: boolean
    ) => setSpellCast({ name: selectedSpell, targetId, confirmed });

    const cast = (selectedSpell: string) => {
        switch (selectedSpell) {
            case 'HEAL':
                setSpell(selectedSpell, currentPlayerId.toString(), true);
                break;
            case 'OUTSIDE':
                setSpell(selectedSpell, entranceName, true);
                break;
            case 'RETURN':
                setSpell(selectedSpell, undefined, true);
                break;
            default:
                break;
        }
    };

    const exitSpellPanel = useCallback(onBack, []);

    useEffect(() => {
        const spellSounds: { [index: string]: string } = {
            HEAL: 'heal',
            OUTSIDE: 'warp',
            RETURN: 'warp',
        };
        const { name, targetId } = spellCast;
        let timer: NodeJS.Timeout;
        if (name && targetId) {
            playSound(spellSounds[name]);
            // @ts-ignore
            timer = setTimeout(() => {
                castSpell(name, targetId);
                setSpellCast({});
                exitSpellPanel();
            }, 4000);
        }
        return () => clearTimeout(timer);
    }, [spellCast, castSpell, exitSpellPanel]);

    const {
        name: spellName,
        targetId: spellTarget,
        confirmed: spellConfirmed,
    } = spellCast;

    const spellMenuProps = {
        key: 'spells',
        options: spellOptions,
        showBackButton: true,
        onBack: exitSpellPanel,
        onNext: cast,
        disabled: !!(spellName && spellTarget),
        onChange: (spell: string) => setSpell(spell),
    };

    const townMenuProps = {
        key: 'towns',
        options: sortBy(
            visited.map((townName) => ({
                value: townName,
                display: upperFirst(townName.toLowerCase()),
            })),
            'display'
        ),
        showBackButton: true,
        onBack: () => setSpellCast({}),
        onNext: (town: string) => setSpell(spellName, town, true),
        disabled: !!(spellName && spellTarget),
    };

    const showSpellCost = !isEmpty(availableSpells) && !spellTarget;

    return (
        <ThemedPanel
            className="player-spells"
            heading="Spells"
            flexDirection="column"
        >
            {spellConfirmed && spellName === 'RETURN' ? (
                <>
                    <Row>
                        <span>Return to</span>
                    </Row>
                    <Row>
                        <OptionPanel {...townMenuProps} />
                    </Row>
                </>
            ) : (
                <Row>
                    <OptionPanel {...spellMenuProps} />
                </Row>
            )}

            {showSpellCost && (
                <Row>
                    <span className="spell-cost">
                        {`Cost ${
                            spellName
                                ? // @ts-ignore
                                  find(availableSpells, { spellName }).mpCost
                                : availableSpells[0].mpCost
                        }/${playerMp}`}
                    </span>
                </Row>
            )}
            {spellName && spellTarget && (
                <Row>
                    <span className="spell-status">
                        {`${playerName} cast ${upperFirst(
                            spellName.toLowerCase()
                        )}`}
                    </span>
                </Row>
            )}
            <audio className="heal">
                <source src={healingSound} />
            </audio>
            <audio className="warp">
                <source src={warpSound} />
            </audio>
        </ThemedPanel>
    );
};

export default PlayerSpells;
