import { Avatar, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react';

export const HomePage = () => {
  return (
    <Stack gap={8}>
      <HStack gap={8} align="flex-start" flexDir={{ base: 'column', md: 'row' }}>
        <Avatar.Root size="xl">
          <Avatar.Fallback name="Your Name" />
        </Avatar.Root>
        <VStack align="flex-start" gap={2}>
          <Heading as="h1" size="lg">
            Your Name
          </Heading>
          <Text fontSize="lg" color="gray.500">
            Software Engineer
          </Text>
          <Text color="gray.500">City, Country</Text>
          <Text maxW="2xl">
            This is a short professional summary about you. Mention your years of experience, key
            technologies, and the type of problems you like to solve. Replace this placeholder text
            with your own bio.
          </Text>
        </VStack>
      </HStack>
    </Stack>
  );
};
