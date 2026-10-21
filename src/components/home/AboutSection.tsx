import { Box, Container, Heading, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import aboutImage from '../../assets/hero-placeholder.svg';

export const AboutSection = () => {
  return (
    <Box as="section">
      <Container maxW="6xl" px={4} py={16}>
        <Heading as="h2" size="2xl" mb={8}>
          About me
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={10} alignItems="center">
          <Image
            src={aboutImage}
            alt="Placeholder portrait"
            borderRadius="lg"
            w="full"
            aspectRatio={4 / 3}
            objectFit="cover"
          />
          <Stack gap={4}>
            <Text fontSize="lg">
              Based in City, Country, I help small businesses in the region and beyond establish a
              professional presence online. Replace this placeholder with a note about where you
              work and who you serve.
            </Text>
            <Text color="gray.600">
              With a background in software engineering, I bring years of experience building
              reliable, maintainable web applications. Placeholder text: mention your key skills,
              technologies, and the kinds of projects you enjoy.
            </Text>
            <Text color="gray.600">
              Outside of work, family life keeps me grounded and shapes how I work: clear
              communication, dependable timelines, and genuine care for every client. Placeholder
              text for a professionally framed note on home life.
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
