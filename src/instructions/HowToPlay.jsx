import React, { useState } from 'react';
import { faDragon } from '@fortawesome/free-solid-svg-icons';
import { faCampground } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Battle from './screenshots/battle.png'
import InBattle from './screenshots/inBattle.png';
import Camping from './screenshots/camping.png';
import Commands1 from './screenshots/commands.png';
import Commands2 from './screenshots/commands2.png';
import Destroyed from './screenshots/destroyed.png';
import Town1 from './screenshots/town1.png';
import Town2 from './screenshots/town2.png';
import FieldMenu1 from './screenshots/fieldmenu1.png'
import FieldMenu2 from './screenshots/fieldmenu2.png'
import './HowToPlay.css';

const Description = () => (

<div className="how-to-play-row">
    <div className="how-to-play-text-area">
        <h3>How to play</h3>
        <span className="description">
            Chronicles of Patrogonia is a classic RPG where you gain
            experience and gold by defeating enemies in battle.
        </span>
        <span className="description">
            You can even team up with other players to help even the odds.
        </span>
    </div>
    <img className="battle" src={Battle} alt="Player in battle" />
</div>
);

const PlayersInBattle = () => (
    <div className="how-to-play-row">
        <img className="square-image player-in-battle" src={InBattle} alt="Player in battle" />
        <div className="how-to-play-text-area">
            <h3>Players in battle</h3>
            <span className="description">
                Players with a <FontAwesomeIcon icon={faDragon} size="2x" />{' '}
                over their shoulder are in battles that you can join.
            </span>
        </div>
    </div>
);

const IdlePlayers = () => (
    <div className="how-to-play-row">
        <div className="how-to-play-text-area">
            <h3>Players camping</h3>
            <span className="description">
                Players with a <FontAwesomeIcon icon={faCampground} size="2x" />{' '}
                over their shoulder aren't playing at the moment.
            </span>
        </div>
        <img className="square-image" src={Camping} alt="Player camping" />
    </div>
);

const Saving = () => (
    <div className="how-to-play-row">
        <img className="square-image" src={Town2} alt="Player saving" />
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        <img className="square-image" src={Town1} alt="Player saving" />
        <div className="how-to-play-text-area">
            <h3>Saving</h3>
            <span className="description">
                Visiting towns heals your hero and saves progress.
            </span>
        </div>
    </div>
);

const BattleControls = () => (
    <div className="how-to-play-row">
        <div className="how-to-play-text-area">
            <h3>Battle command keys</h3>
            <span className="description">
                1 through 5 choose the matching menu option or you can arrow up
                and down in the list.
            </span>
            <span className="description">
                Confirm selection
                <ul>
                    <li>Enter</li>
                    <li>Right arrow</li>
                </ul>
            </span>
            <span className="description">
                Go back
                <ul>
                    <li>Escape</li>
                    <li>Backspace</li>
                    <li>Delete</li>
                    <li>Left arrow</li>
                </ul>
            </span>
        </div>
        <img className="square-image" src={Commands1} alt="Battle commands" />
        <FontAwesomeIcon icon={faArrowRight} size="2x" />
        <img className="square-image" src={Commands2} alt="Choosing targets" />
    </div>
);

const FieldMenu = () => (
    <div className="how-to-play-row">
        <div className="how-to-play-text-area">
            <h3>Field menu</h3>
            <span className="description">
                You can open the field menu by pressing Enter.
            </span>
            <span className="description">
                The menu options work like the battle ones.
            </span>
            <span className="description">
                You can view your player's stats or cast spells that you have learned.
            </span>
            <span className="description">
                Pressing Esc or clicking outside of the field menu closes it.
            </span>
        </div>
        <img className="square-image" src={FieldMenu1} alt="Opening field menu" />
        <FontAwesomeIcon icon={faArrowRight} size="2x" />
        <img className="square-image" src={FieldMenu2} alt="Choosing spells" />
    </div>
);

const Defeat = () => (
    <div className="how-to-play-row">
        <img className="defeated" src={Destroyed} alt="Party destroyed" />
        <div className="how-to-play-text-area">
            <h3>Defeat</h3>
            <span className="description">Goblins got you down?</span>
            <span className="description">
                Worry not, players defeated in battle will respawn at the last
                town they visited with their last saved stats loaded.
            </span>
            <span className="description">
                You can even rejoin the same battle if you make it back.
            </span>
            <span className="description">Good Luck!</span>
        </div>
    </div>
);

const Instructions = [
    Description,
    PlayersInBattle,
    IdlePlayers,
    Saving,
    BattleControls,
    FieldMenu,
    Defeat,
];

const HowToPlay = ({ onDismiss }) => {
    const [instructionIndex, setInstructionIndex] = useState(0);
    const Instruction = Instructions[instructionIndex];
    const isFirstInstruction = instructionIndex === 0;
    const isLastInstruction = instructionIndex === Instructions.length - 1;

    const handleBackClick = () => {
        if (isFirstInstruction) {
            onDismiss();
        } else {
            setInstructionIndex(instructionIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (isLastInstruction) {
            onDismiss();
        } else {
            setInstructionIndex(instructionIndex + 1);
        }
    };

    return (
        <div className="how-to-play">
            <Instruction />
            <div className="navigation-buttons">
                <button className="back-button" onClick={handleBackClick}>
                    {isFirstInstruction ? 'Skip' : 'Back'}
                </button>
                <button
                    autoFocus={true}
                    className="next-button"
                    onClick={handleNextClick}
                >
                    {isLastInstruction ? 'Play' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default HowToPlay;
