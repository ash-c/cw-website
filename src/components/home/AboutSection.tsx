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
              I&apos;m a full-stack software engineer based in Taranaki, New Zealand. I&apos;ve
              always enjoyed technology, and I love programming and taking on a good challenge.
            </Text>
            <Text color="gray.600">
              My passions include gaming, sim racing, and the technical side of products. I enjoy
              solving problems for customers, I learn new things quickly, and I have a good memory
              for the details that matter.
            </Text>
            <Text color="gray.600">
              I&apos;m responsible, honest, hardworking, and punctual. I enjoy working in teams and
              making a difference through the work I do.
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
