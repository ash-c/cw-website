import { Box } from '@chakra-ui/react';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { ServicesSection } from '../components/home/ServicesSection';

export const HomePage = () => {
  return (
    <Box>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
    </Box>
  );
};
