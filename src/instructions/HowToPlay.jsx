import React from 'react';
import { faDragon } from '@fortawesome/free-solid-svg-icons';
import { faCampground } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InBattle from './screenshots/inBattle.png';
import Camping from './screenshots/camping.png';
import Commands1 from './screenshots/commands.png';
import Commands2 from './screenshots/commands2.png';
import Destroyed from './screenshots/destroyed.png';
import Town1 from './screenshots/town1.png';
import Town2 from './screenshots/town2.png';
import './HowToPlay.css';

const HowToPlay = ({ onDismiss }) => (
    <div className="how-to-play">
        <div className="how-to-play-header">
            <h2>How to play</h2>
            <span>
                Chronicles of Patrogonia is a classic style RPG where you gain
                experience and gold by defeating enemies in battle.
            </span>
            <span>
                You can team up with other players too to help even the odds.
            </span>
        </div>

        <div className="how-to-play-row">
            <img
                className="square-image"
                src={InBattle}
                alt="Player in battle"
            />
            <div className="how-to-play-text-area">
                <h3>Players in battle</h3>
                <span className="description">
                    Players with a <FontAwesomeIcon icon={faDragon} size="2x" />{' '}
                    over their shoulder are in battles that you can join.
                </span>
            </div>
        </div>

        <div className="how-to-play-row">
            <div className="how-to-play-text-area">
                <h3>Players camping</h3>
                <span className="description">
                    Players with a{' '}
                    <FontAwesomeIcon icon={faCampground} size="2x" /> over their
                    shoulder aren't playing at the moment.
                </span>
            </div>
            <img className="square-image" src={Camping} alt="Player camping" />
        </div>

        <div className="how-to-play-row">
            <img className="square-image" src={Town2} alt="Player saving" />
            <FontAwesomeIcon icon={faArrowLeft} size="3x" />
            <img className="square-image" src={Town1} alt="Player saving" />
            <div className="how-to-play-text-area">
                <h3>Saving</h3>
                <span className="description">
                    Visiting towns heals your hero and saves progress.
                </span>
            </div>
        </div>

        <div className="how-to-play-row">
            <div className="how-to-play-text-area">
                <h3>Battle command keys</h3>
                <span className="description">
                    1 through 5 choose the matching menu option or you can arrow
                    up and down in the list.
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
            <img
                className="square-image"
                src={Commands1}
                alt="Battle commands"
            />
            <FontAwesomeIcon icon={faArrowRight} size="3x" />
            <img
                className="square-image"
                src={Commands2}
                alt="Choosing targets"
            />
        </div>

        <div className="how-to-play-row">
            <img className="defeated" src={Destroyed} alt="Party destroyed" />
            <div className="how-to-play-text-area">
                <h3>Defeat</h3>
                <span className="description">Goblins got you down?</span>
                <span className="description">
                    Worry not, players defeated in battle will respawn at the
                    last town they visited with their last saved stats loaded.
                </span>
                <span className="description">
                    You can even rejoin the same battle if you make it back.
                </span>
            </div>
        </div>

        <div className="good-luck">
            <h3>Good Luck!</h3>
            <button className="play-button" onClick={onDismiss}>
                Play
            </button>
        </div>
    </div>
);

export default HowToPlay;
