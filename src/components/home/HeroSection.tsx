import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import heroImage from '../../assets/hero-placeholder.svg';

export const HeroSection = () => {
  return (
    <Box
      as="section"
      position="relative"
      minH="70vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundImage={`url(${heroImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box position="absolute" inset={0} bg="blackAlpha.600" />
      <VStack position="relative" gap={4} px={4} py={16} textAlign="center" maxW="3xl">
        <Heading as="h1" size={{ base: '4xl', md: '6xl' }} color="white">
          Code Wizardry
        </Heading>
        <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="semibold" color="highlight.300">
          Handcrafted websites for small businesses
        </Text>
        <Text fontSize="lg" color="whiteAlpha.900">
          Placeholder sub-line: fast, modern, and easy-to-manage websites that help local businesses
          grow online.
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
          <RouterLink to="/projects">View my work</RouterLink>
        </Button>
      </VStack>
    </Box>
  );
};
