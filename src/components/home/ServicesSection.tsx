import { Box, Container, Heading, HStack, SimpleGrid, Tag, Text } from '@chakra-ui/react';

const services = [
  {
    title: 'Custom website builds',
    description:
      'Placeholder: bespoke websites designed around your business, brand, and customers.',
  },
  {
    title: 'Responsive design',
    description:
      'Placeholder: sites that look great and work smoothly on phones, tablets, and desktops.',
  },
  {
    title: 'Ongoing maintenance',
    description:
      'Placeholder: updates, hosting support, and improvements to keep your site secure and current.',
  },
];

const skills = ['React', 'TypeScript', 'Accessibility', 'SEO', 'Performance', 'Hosting'];

export const ServicesSection = () => {
  return (
    <Box as="section" bg="gray.50">
      <Container maxW="6xl" px={4} py={16}>
        <Heading as="h2" size="2xl" mb={8}>
          What I provide
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
          {services.map((service) => (
            <Box
              key={service.title}
              bg="white"
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="lg"
              p={6}
            >
              <Heading as="h3" size="md" mb={2}>
                {service.title}
              </Heading>
              <Text color="gray.600">{service.description}</Text>
            </Box>
          ))}
        </SimpleGrid>
        <HStack gap={2} mt={8} flexWrap="wrap">
          {skills.map((skill) => (
            <Tag.Root
              key={skill}
              size="md"
              variant="subtle"
              bg="highlight.100"
              color="highlight.900"
            >
              <Tag.Label>{skill}</Tag.Label>
            </Tag.Root>
          ))}
        </HStack>
      </Container>
    </Box>
  );
};
