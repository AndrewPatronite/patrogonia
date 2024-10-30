'use client';

import dynamic from 'next/dynamic';

const LandingPage = dynamic(() => import('../../landing/LandingPage'), {
  ssr: false,
});

const LoginClient = () => <LandingPage />;

export default LoginClient;
