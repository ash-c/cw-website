import { Box, Flex, HStack, Link as ChakraLink, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const NavBar = () => {
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={10}
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Flex maxW="6xl" mx="auto" px={4} py={3} align="center" justify="space-between">
        <Text fontWeight="bold">Software Engineer</Text>
        <HStack gap={4} align="center">
          <ChakraLink asChild fontWeight="medium">
            <RouterLink to="/">Home</RouterLink>
          </ChakraLink>
          <ChakraLink asChild fontWeight="medium">
            <RouterLink to="/projects">Projects</RouterLink>
          </ChakraLink>
        </HStack>
      </Flex>
    </Box>
  );
};
