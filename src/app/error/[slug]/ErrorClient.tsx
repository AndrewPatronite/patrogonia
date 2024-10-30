'use client';

import { Box, Flex, Heading, Link } from '@chakra-ui/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const errors: { [key: string]: string } = {
  '/error/404': "I am error... and this page doesn't exist.",
  '/error/uh-oh': 'I am error.',
};

const ErrorClient = () => {
  const pathname = usePathname();
  const error = useMemo(() => errors[pathname], [pathname]);

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
    >
      <Heading as="h1" size="lg">
        {error}
      </Heading>
      <Box boxSize="16rem" position="relative">
        <Image src="/images/enemies/goblin.svg" alt="Goblin" fill />
      </Box>
      <Link href="/">Run away</Link>
    </Flex>
  );
};

export default ErrorClient;
