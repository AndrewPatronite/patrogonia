import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Player } from '../player';

const useRoutingEffect = (currentPlayer: Player | null) => {
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    let nextPath;

    if (currentPlayer?.loggedIn) {
      if (currentPlayer.battleId && !pathname.startsWith('/battle')) {
        nextPath = '/battle';
      } else {
        const mapPath = `/field/${currentPlayer.location.mapName
          .replaceAll(' ', '_')
          .toLowerCase()}`;
        if (!currentPlayer.battleId && !pathname.startsWith(mapPath)) {
          nextPath = mapPath;
        }
      }
    } else {
      if (!pathname.startsWith('/login')) {
        nextPath = '/login';
      }
    }
    if (nextPath) {
      replace(nextPath);
    }
  }, [currentPlayer, pathname, replace]);
};

export default useRoutingEffect;
