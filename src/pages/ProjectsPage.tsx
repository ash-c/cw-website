import { Box, Container, Heading, HStack, SimpleGrid, Tag, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { getProjectDetailPath, projects, type Project } from '../data/projects';

const cardRows = 4;

const cardStyles = {
  display: 'grid',
  gridTemplateRows: 'subgrid',
  gridRow: `span ${cardRows}`,
  mb: 6,
  bg: 'white',
  borderWidth: '1px',
  borderColor: 'gray.200',
  borderRadius: 'lg',
  p: 6,
} as const;

const linkedCardStyles = {
  ...cardStyles,
  color: 'inherit',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  _hover: { borderColor: 'primary.300', boxShadow: 'md', textDecoration: 'none' },
  _focusVisible: { outline: '3px solid', outlineColor: 'primary.500', outlineOffset: '2px' },
} as const;

type ProjectCardContentProps = {
  project: Project;
  titleId: string;
  cue?: string;
};

const ProjectCardContent = ({ project, titleId, cue }: ProjectCardContentProps) => (
  <>
    <Heading as="h2" id={titleId} size="md" mb={2}>
      {project.title}
    </Heading>
    <Text mb={3}>{project.description}</Text>
    <HStack gap={2} flexWrap="wrap" alignSelf="end">
      {project.techStack.map((tech) => (
        <Tag.Root key={tech} size="sm" variant="subtle" bg="highlight.100" color="highlight.900">
          <Tag.Label>{tech}</Tag.Label>
        </Tag.Root>
      ))}
    </HStack>
    <Box pt={3} _empty={{ pt: 0 }}>
      {cue && (
        <Text as="span" fontWeight="semibold" color="primary.600">
          {cue}
        </Text>
      )}
    </Box>
  </>
);

const ProjectCard = ({ project }: { project: Project }) => {
  const titleId = `project-${project.slug}-title`;
  const detailPath = getProjectDetailPath(project);

  if (detailPath) {
    return (
      <Box asChild {...linkedCardStyles}>
        <RouterLink to={detailPath} aria-labelledby={titleId}>
          <ProjectCardContent project={project} titleId={titleId} cue="Read more" />
        </RouterLink>
      </Box>
    );
  }

  if (project.link) {
    return (
      <Box asChild {...linkedCardStyles}>
        <a href={project.link} target="_blank" rel="noopener noreferrer" aria-labelledby={titleId}>
          <ProjectCardContent project={project} titleId={titleId} cue="View Project" />
        </a>
      </Box>
    );
  }

  return (
    <Box {...cardStyles}>
      <ProjectCardContent project={project} titleId={titleId} />
    </Box>
  );
};

export const ProjectsPage = () => {
  return (
    <Container maxW="6xl" px={4} py={8}>
      <VStack align="flex-start" gap={6}>
        <Heading as="h1" size="lg">
          Projects
        </Heading>
        <Text color="gray.500" maxW="2xl">
          A selection of my personal projects and professional work.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} columnGap={6} rowGap={0} w="full">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};
