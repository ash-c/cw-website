import { Box, Button, Heading, Link, SimpleGrid, Tag, Text, VStack } from '@chakra-ui/react';
import { projects } from '../data/projects';

export const ProjectsPage = () => {
  return (
    <VStack align="flex-start" gap={6}>
      <Heading as="h1" size="lg">
        Projects
      </Heading>
      <Text color="gray.500" maxW="2xl">
        A selection of projects you have worked on. Replace these placeholders with real
        applications, libraries, or contributions you want to highlight.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="full">
        {projects.map((project) => (
          <Box
            key={project.title}
            bg="white"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            p={6}
          >
            <Heading as="h2" size="md" mb={2}>
              {project.title}
            </Heading>
            <Text mb={3}>{project.description}</Text>
            <VStack align="flex-start" gap={3}>
              <Box>
                {project.techStack.map((tech) => (
                  <Tag.Root
                    key={tech}
                    size="sm"
                    variant="subtle"
                    bg="highlight.100"
                    color="highlight.900"
                  >
                    <Tag.Label>{tech}</Tag.Label>
                  </Tag.Root>
                ))}
              </Box>
              {project.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  _hover={{ textDecoration: 'none' }}
                >
                  <Button
                    size="sm"
                    variant="outline"
                    borderColor="primary.500"
                    color="primary.600"
                    _hover={{ bg: 'primary.50', borderColor: 'primary.600' }}
                    _active={{ bg: 'primary.100' }}
                  >
                    View Project
                  </Button>
                </Link>
              )}
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};
