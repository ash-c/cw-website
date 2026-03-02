import { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { NavBar } from './NavBar';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh">
      <NavBar />
      <Container maxW="6xl" px={4} py={8}>
        {children}
      </Container>
    </Box>
  );
};
