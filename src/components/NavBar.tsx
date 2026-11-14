import { Box, Flex, HStack, Link as ChakraLink, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { SocialLinks } from './SocialLinks';

export const NavBar = () => {
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={10}
      bgGradient="to-r"
      gradientFrom="primary.500"
      gradientTo="secondary.500"
    >
      <Flex
        maxW="6xl"
        mx="auto"
        px={{ base: 3, sm: 4 }}
        py={3}
        gap={2}
        align="center"
        justify="space-between"
      >
        <Text fontWeight="bold" color="white" whiteSpace="nowrap">
          Ash Crockett
        </Text>
        <HStack gap={{ base: 3, sm: 4 }} align="center">
          <ChakraLink
            asChild
            fontWeight="medium"
            color="whiteAlpha.900"
            _hover={{ color: 'highlight.300', textDecoration: 'none' }}
            _focusVisible={{ boxShadow: '0 0 0 3px var(--chakra-colors-highlight-300)' }}
          >
            <RouterLink to="/">Home</RouterLink>
          </ChakraLink>
          <ChakraLink
            asChild
            fontWeight="medium"
            color="whiteAlpha.900"
            _hover={{ color: 'highlight.300', textDecoration: 'none' }}
            _focusVisible={{ boxShadow: '0 0 0 3px var(--chakra-colors-highlight-300)' }}
          >
            <RouterLink to="/projects">Projects</RouterLink>
          </ChakraLink>
          <SocialLinks color="whiteAlpha.900" hoverColor="highlight.300" />
        </HStack>
      </Flex>
    </Box>
  );
};
