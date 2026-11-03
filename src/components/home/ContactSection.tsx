import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';

const linkedInUrl = 'https://www.linkedin.com/in/ashcrockett';

export const ContactSection = () => {
  return (
    <Box as="section">
      <Container maxW="6xl" px={4} py={16}>
        <VStack gap={4} textAlign="center">
          <Heading as="h2" size="2xl">
            Get in touch
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="2xl">
            Want to chat about a project or opportunity? The best way to reach me is on LinkedIn.
          </Text>
          <Button
            asChild
            size="lg"
            mt={4}
            bg="highlight.500"
            color="gray.900"
            _hover={{ bg: 'highlight.400' }}
            _active={{ bg: 'highlight.600' }}
          >
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
              Connect on LinkedIn
            </a>
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};
