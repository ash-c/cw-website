import { Box } from '@chakra-ui/react';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { SkillsSection } from '../components/home/SkillsSection';
import { ContactSection } from '../components/home/ContactSection';

export const HomePage = () => {
  return (
    <Box>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </Box>
  );
};
