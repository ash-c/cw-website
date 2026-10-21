import { ReactNode } from 'react';
import { Container, Flex } from '@chakra-ui/react';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex flexDir="column" minH="100vh">
      <NavBar />
      <Container flex="1" maxW="6xl" px={4} py={8}>
        {children}
      </Container>
      <Footer />
    </Flex>
  );
};
