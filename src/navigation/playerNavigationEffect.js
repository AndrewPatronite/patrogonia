import { Direction } from './Direction';
import { movePlayer } from './movePlayer';
import { OPEN_FIELD_MENU } from './FieldMenuKeys';

export const playerNavigationEffect = (currentPlayer, updatePlayer) => () => {
    const { isDirectionKey, getDirection } = Direction;

    const handleKeyDown = ({ key }) => {
        const navigationEnabled =
            currentPlayer.loggedIn &&
            !currentPlayer.battleId &&
            !currentPlayer.showFieldMenu &&
            currentPlayer.skipInstructions;
        if (navigationEnabled) {
            if (isDirectionKey(key)) {
                movePlayer(currentPlayer, getDirection(key), updatePlayer);
            } else {
                if (key === OPEN_FIELD_MENU) {
                    updatePlayer(
                        { ...currentPlayer, showFieldMenu: true },
                        false
                    );
                }
            }
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
};
