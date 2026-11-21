import { Container, Heading, HStack, Link as ChakraLink, Stack, Tag, Text } from '@chakra-ui/react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { findProjectWithDetails } from '../data/projects';

const linkStyles = {
  color: 'primary.600',
  fontWeight: 'medium',
  _hover: { color: 'primary.700' },
  _focusVisible: { outline: '3px solid', outlineColor: 'primary.500', outlineOffset: '2px' },
} as const;

const BackToProjectsLink = () => (
  <ChakraLink asChild {...linkStyles}>
    <RouterLink to="/projects">
      <span aria-hidden="true">←</span> Back to projects
    </RouterLink>
  </ChakraLink>
);

type ExternalLinkProps = {
  href: string;
  children: string;
};

const ExternalLink = ({ href, children }: ExternalLinkProps) => (
  <ChakraLink href={href} target="_blank" rel="noopener noreferrer" {...linkStyles}>
    {children}
  </ChakraLink>
);

export const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = findProjectWithDetails(slug);

  if (!project?.details) {
    return (
      <Container maxW="6xl" px={4} py={8}>
        <Stack align="flex-start" gap={4}>
          <Heading as="h1" size="lg">
            Project not found
          </Heading>
          <Text color="gray.600">
            There is no detail page for this project. Browse the full list to find what you are
            looking for.
          </Text>
          <BackToProjectsLink />
        </Stack>
      </Container>
    );
  }

  const { title, techStack, link, details } = project;
  const retrospective = details.retrospective?.paragraphs.length
    ? details.retrospective
    : undefined;

  return (
    <Container maxW="3xl" px={4} py={8}>
      <Stack align="flex-start" gap={8}>
        <BackToProjectsLink />
        <Stack gap={4}>
          <Heading as="h1" size="2xl">
            {title}
          </Heading>
          <Text fontSize="lg" color="gray.600">
            {details.introduction}
          </Text>
          <HStack gap={2} flexWrap="wrap">
            {techStack.map((tech) => (
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
          </HStack>
          {link && <ExternalLink href={link}>{`Visit ${title}`}</ExternalLink>}
        </Stack>

        {details.sections.map((section) => (
          <Stack as="section" key={section.title} gap={3}>
            <Heading as="h2" size="lg">
              {section.title}
            </Heading>
            {section.paragraphs.map((paragraph) => (
              <Text key={paragraph}>{paragraph}</Text>
            ))}
          </Stack>
        ))}

        {details.demo && (
          <Stack as="section" gap={3}>
            <Heading as="h2" size="lg">
              Demo
            </Heading>
            <ExternalLink href={details.demo.href}>{details.demo.label}</ExternalLink>
          </Stack>
        )}

        {retrospective && (
          <Stack as="section" gap={3}>
            <Heading as="h2" size="lg">
              Retrospective
            </Heading>
            {retrospective.paragraphs.map((paragraph) => (
              <Text key={paragraph}>{paragraph}</Text>
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
};
