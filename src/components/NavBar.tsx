import { Box, Flex, HStack, Link as ChakraLink, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

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
      <Flex maxW="6xl" mx="auto" px={4} py={3} align="center" justify="space-between">
        <Text fontWeight="bold" color="white">
          Code Wizardry
        </Text>
        <HStack gap={4} align="center">
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
        </HStack>
      </Flex>
    </Box>
  );
};
