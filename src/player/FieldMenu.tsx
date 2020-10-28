import React, { useRef, useState } from 'react';
import { filter, isEmpty } from 'lodash';
import Modal from 'react-modal';
import Player from './Player';
import OptionPanel from '../battle/OptionPanel';
import PlayerStatsPanel from './PlayerStatsPanel';
import PlayerSpells from './PlayerSpells';
import { Maps } from '../environment/maps/Maps';
import PlayerOptions from './PlayerOptions';
import ThemedPanel from '../components/theme/ThemedPanel';

const FieldMenu = ({
    showFieldMenu,
    closeFieldMenu,
    currentPlayer,
    castSpell,
}: {
    showFieldMenu: boolean;
    closeFieldMenu: (event: React.MouseEvent | React.KeyboardEvent) => void;
    currentPlayer: Player;
    castSpell: (spellName: string, targetId: string) => void;
}) => {
    const [menuChoice, setMenuChoice] = useState<string>('playerStats');
    const optionPanelRef = useRef(null);
    const availableSpells = filter(currentPlayer.spells, (spell) => {
        let canCast =
            spell.mpCost <= currentPlayer.stats.mp && !spell.offensive;
        if (canCast) {
            switch (spell.spellName) {
                case 'HEAL':
                    canCast =
                        currentPlayer.stats.hp < currentPlayer.stats.hpTotal;
                    break;
                case 'OUTSIDE':
                    canCast = Maps.isCave(currentPlayer.location.mapName);
                    break;
                case 'RETURN':
                    canCast = Maps.isField(currentPlayer.location.mapName);
                    break;
            }
        }
        return canCast;
    });

    const displayMenuOption = () => {
        switch (menuChoice) {
            case 'spells':
                return (
                    <PlayerSpells
                        currentPlayer={currentPlayer}
                        availableSpells={availableSpells}
                        onBack={() => {
                            // @ts-ignore
                            optionPanelRef.current.focus();
                        }}
                        castSpell={castSpell}
                    />
                );
            case 'playerOptions':
                return <PlayerOptions />;
            case 'playerStats':
            default:
                return <PlayerStatsPanel playerStats={currentPlayer.stats} />;
        }
    };

    const modalStyle = {
        content: {
            top: '30%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform:
                menuChoice === 'playerStats'
                    ? 'translate(5%, 5%)'
                    : 'translate(5%, 10%)',
            maxWidth: '339px'
        },
    };

    const fieldMenuProps = {
        options: [
            { value: 'playerStats', display: 'Stats' },
            {
                value: 'spells',
                display: 'Spells',
                disabled: isEmpty(availableSpells),
            },
            { value: 'playerOptions', display: 'Options' },
        ],
        onBack: () => {},
        onNext: () => {},
        onChange: setMenuChoice,
        showBackButton: false,
        showNextButton: false,
        initialValue: menuChoice,
    };

    return (
        <Modal
            className="field-menu-modal"
            isOpen={showFieldMenu}
            onRequestClose={closeFieldMenu}
            style={modalStyle}
        >
            <ThemedPanel className="field-menu" padding="0">
                &nbsp;
                <OptionPanel {...fieldMenuProps} ref={optionPanelRef} />
                {displayMenuOption()}
            </ThemedPanel>
        </Modal>
    );
};

export default FieldMenu;
