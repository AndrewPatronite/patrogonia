'use client';

import dynamic from 'next/dynamic';

const Battle = dynamic(() => import('../../battle/Battle'), { ssr: false });

const BattleClient = () => <Battle />;

export default BattleClient;
