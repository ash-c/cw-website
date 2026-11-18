import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithProviders } from '../testing/render';
import { SocialLinks } from './SocialLinks';

it.each([
  { variant: 'default', props: {} },
  { variant: 'configured', props: { color: 'gray.500', hoverColor: 'gray.700', boxSize: 6 } },
])('offers safe, named social links with $variant props', ({ props }) => {
  renderWithProviders(<SocialLinks {...props} />);

  const destinations = {
    GitHub: 'https://github.com/ash-c',
    LinkedIn: 'https://www.linkedin.com/in/ashcrockett/',
  };

  for (const [name, href] of Object.entries(destinations)) {
    const link = screen.getByRole('link', { name });
    expect(link).toHaveAttribute('href', href);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.getAttribute('rel')?.split(/\s+/)).toEqual(
      expect.arrayContaining(['noopener', 'noreferrer']),
    );
  }
});
