import { Box, Container, Heading, HStack, SimpleGrid, Tag, Text } from '@chakra-ui/react';

const skillGroups = [
  {
    title: 'Front-end',
    description: 'TypeScript, JavaScript, and React, with GraphQL and Apollo for data fetching.',
  },
  {
    title: 'Back-end & cloud',
    description: 'Node.js, GraphQL APIs, AWS, Serverless, and event streaming with Kafka.',
  },
  {
    title: 'Soft skills',
    description:
      'Teamwork, mentoring, problem solving, communication, quick learning, and customer service face-to-face, by phone, and online.',
  },
];

const technologies = [
  'TypeScript',
  'React',
  'GraphQL',
  'Apollo',
  'Node.js',
  'AWS',
  'Serverless',
  'Kafka',
];

export const SkillsSection = () => {
  return (
    <Box as="section" bg="gray.50">
      <Container maxW="6xl" px={4} py={16}>
        <Heading as="h2" size="2xl" mb={8}>
          Skills &amp; expertise
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
          {skillGroups.map((group) => (
            <Box
              key={group.title}
              bg="white"
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="lg"
              p={6}
            >
              <Heading as="h3" size="md" mb={2}>
                {group.title}
              </Heading>
              <Text color="gray.600">{group.description}</Text>
            </Box>
          ))}
        </SimpleGrid>
        <HStack gap={2} mt={8} flexWrap="wrap">
          {technologies.map((technology) => (
            <Tag.Root
              key={technology}
              size="md"
              variant="subtle"
              bg="highlight.100"
              color="highlight.900"
            >
              <Tag.Label>{technology}</Tag.Label>
            </Tag.Root>
          ))}
        </HStack>
      </Container>
    </Box>
  );
};
