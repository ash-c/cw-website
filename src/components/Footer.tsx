import { Box, Flex, Text } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box as="footer" borderTop="1px" borderColor="gray.200" py={6}>
      <Flex maxW="6xl" mx="auto" px={4} justify="center">
        <Text fontSize="sm" color="gray.500">
          &copy; {new Date().getFullYear()} Code Wizardry. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};
