import { Avatar, Box, Heading, HStack, Link, Stack, Text, VStack } from '@chakra-ui/react';

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

      <Stack gap={6} direction={{ base: 'column', md: 'row' }}>
        <Box flex="2" bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="lg" p={6}>
          <Heading as="h2" size="md" mb={4}>
            Experience Highlights
          </Heading>
          <VStack align="flex-start" gap={4}>
            <Box>
              <Text fontWeight="semibold">Role at Company One</Text>
              <Text fontSize="sm" color="gray.500">
                YYYY – YYYY · Location
              </Text>
              <Text mt={1}>
                One or two bullet-style sentences describing your key responsibilities and impact in
                this role.
              </Text>
            </Box>
            <Box>
              <Text fontWeight="semibold">Role at Company Two</Text>
              <Text fontSize="sm" color="gray.500">
                YYYY – YYYY · Location
              </Text>
              <Text mt={1}>
                Another concise summary of achievements, technologies used, and outcomes.
              </Text>
            </Box>
          </VStack>
        </Box>

        <Box flex="1" bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="lg" p={6}>
          <Heading as="h2" size="md" mb={4}>
            Contact
          </Heading>
          <VStack align="flex-start" gap={2}>
            <HStack>
              <Text fontWeight="medium">Email:</Text>
              <Link href="mailto:you@example.com">you@example.com</Link>
            </HStack>
            <HStack>
              <Text fontWeight="medium">GitHub:</Text>
              <Link href="https://github.com/your-handle" target="_blank" rel="noopener noreferrer">
                github.com/your-handle
              </Link>
            </HStack>
            <HStack>
              <Text fontWeight="medium">LinkedIn:</Text>
              <Link
                href="https://linkedin.com/in/your-handle"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/your-handle
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Stack>
    </Stack>
  );
};
