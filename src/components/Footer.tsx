import { Box, HStack, Text } from '@chakra-ui/react';
import { SocialLinks } from './SocialLinks';

export const Footer = () => {
  return (
    <Box as="footer" borderTop="1px" borderColor="gray.200" py={6}>
      <HStack maxW="6xl" mx="auto" px={4} w="full" justify="space-between">
        <Text fontSize="sm" color="gray.500">
          &copy; {new Date().getFullYear()} Ash Crockett. All rights reserved.
        </Text>
        <SocialLinks color="gray.500" hoverColor="gray.700" />
      </HStack>
    </Box>
  );
};
