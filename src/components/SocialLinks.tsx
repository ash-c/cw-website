import { HStack, IconProps, Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { GitHubIcon, LinkedInIcon } from './icons';

type SocialLinksProps = {
  color?: LinkProps['color'];
  hoverColor?: LinkProps['color'];
  boxSize?: IconProps['boxSize'];
};

const links = [
  { label: 'GitHub', href: 'https://github.com/ash-c', Icon: GitHubIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ashcrockett/', Icon: LinkedInIcon },
];

export const SocialLinks = ({ color, hoverColor, boxSize = 5 }: SocialLinksProps) => {
  return (
    <HStack gap={3} align="center">
      {links.map(({ label, href, Icon }) => (
        <ChakraLink
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          color={color}
          _hover={{ color: hoverColor }}
          _focusVisible={{ boxShadow: '0 0 0 3px var(--chakra-colors-highlight-300)' }}
        >
          <Icon boxSize={boxSize} />
        </ChakraLink>
      ))}
    </HStack>
  );
};
