import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { isEmpty } from 'lodash';
import './Log.css';
import { pauseSound, playSound } from '../environment/sound/sound';
import playerAttackSound from '../environment/sound/FXhome.com/FXhome.com Fighting Swing Sound 02.mp3';
import enemyAttackSound from '../environment/sound/FXhome.com/FXhome.com Fighting Swing Sound 27.mp3';
import levelUpSound from '../environment/sound/zapsplat/cartoon_success_fanfair.mp3';
import partyDestroyedSound from '../environment/sound/zapsplat/cartoon_fail_strings_trumpet.mp3';
import healingSound from '../environment/sound/zapsplat/zapsplat_fantasy_magic_mystery_glissando_bell_43990.mp3';
import iceSound from '../environment/sound/zapsplat/sound_spark_Ice_Spell_Elsas_Frozen_Death_Touch_01.mp3';

const Log = ({
    deliveredEntries,
    onDismiss,
    showDismiss,
    statusClass,
    allMessagesDelivered,
}) => {
    const [logEntryMusicPlayed, setLogEntryMusicPlayed] = useState({});
    const scrollTo = useRef(null);

    useEffect(() => {
        scrollTo.current.scrollIntoView();
    });

    useLayoutEffect(() => {
        const setEntryPlayed = (lastDeliveredEntryIndex) => {
            setLogEntryMusicPlayed((prevState) => ({
                ...prevState,
                [lastDeliveredEntryIndex]: true,
            }));
        };

        if (!isEmpty(deliveredEntries)) {
            const lastDeliveredEntryIndex = deliveredEntries.length - 1;
            if (!logEntryMusicPlayed[lastDeliveredEntryIndex]) {
                const { content, targetId } = deliveredEntries[
                    lastDeliveredEntryIndex
                ];
                if (content.includes('attacks')) {
                    //TODO revisit:
                    const integerMaxStringLength = 11;
                    if (targetId && targetId.length > integerMaxStringLength) {
                        playSound('player-attack');
                    } else {
                        playSound('enemy-attack');
                    }
                    setEntryPlayed(lastDeliveredEntryIndex);
                } else if (content.includes('casts Heal')) {
                    playSound('heal');
                } else if (content.includes('casts Ice')) {
                    playSound('ice');
                } else if (content.includes('level')) {
                    pauseSound('battle-music');
                    playSound('level-up');
                    setEntryPlayed(lastDeliveredEntryIndex);
                } else if (content.includes('destroyed')) {
                    pauseSound('battle-music');
                    playSound('party-destroyed');
                    setEntryPlayed(lastDeliveredEntryIndex);
                }
            }
        }
    }, [deliveredEntries, logEntryMusicPlayed]);

    const getButtonText = () =>
        deliveredEntries[deliveredEntries.length - 1].content.includes(
            'destroyed'
        )
            ? 'Load save'
            : 'OK';

    return (
        <div className={`log ${statusClass}`}>
            {!isEmpty(deliveredEntries) &&
                deliveredEntries.map((entry, index) => (
                    <p key={index}>{entry.content}</p>
                ))}
            {showDismiss && allMessagesDelivered && (
                <button
                    autoFocus={true}
                    className="dismiss-button"
                    onClick={onDismiss}
                >
                    {getButtonText()}
                </button>
            )}
            <div className="scroll-to" ref={scrollTo} />
            <audio className="player-attack">
                <source src={playerAttackSound} />
            </audio>
            <audio className="enemy-attack">
                <source src={enemyAttackSound} />
            </audio>
            <audio className="level-up">
                <source src={levelUpSound} />
            </audio>
            <audio className="party-destroyed">
                <source src={partyDestroyedSound} />
            </audio>
            <audio className="heal">
                <source src={healingSound} />
            </audio>
            <audio className="ice">
                <source src={iceSound} />
            </audio>
        </div>
    );
};

export default Log;
