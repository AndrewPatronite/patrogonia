'use client';

import dynamic from 'next/dynamic';

const World = dynamic(() => import('../../../environment/field/World'), {
  ssr: false,
});

const FieldClient = () => <World />;

export default FieldClient;
