import { Direction } from './Direction';
import { movePlayer } from './movePlayer';

export const playerNavigationEffect = (currentPlayer, updatePlayer) => () => {
    const { isDirectionKey, getDirection } = Direction;

    const handleKeyDown = ({ key }) => {
        if (
            currentPlayer.loggedIn &&
            !currentPlayer.battleId &&
            isDirectionKey(key)
        ) {
            movePlayer(currentPlayer, getDirection(key), updatePlayer);
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
};
