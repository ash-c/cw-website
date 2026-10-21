import { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex flexDir="column" minH="100vh">
      <NavBar />
      <Box as="main" flex="1">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};
