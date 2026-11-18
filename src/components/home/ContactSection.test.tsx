import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithProviders } from '../../testing/render';
import { ContactSection } from './ContactSection';

it('directs visitors to Ash on LinkedIn with a safe external link', () => {
  renderWithProviders(<ContactSection />);

  expect(screen.getByRole('heading', { level: 2, name: 'Get in touch' })).toBeVisible();
  expect(screen.getByText(/The best way to reach me is on LinkedIn/)).toBeVisible();

  const link = screen.getByRole('link', { name: 'Connect on LinkedIn' });
  expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/ashcrockett');
  expect(link).toHaveAttribute('target', '_blank');
  expect(link.getAttribute('rel')?.split(/\s+/)).toEqual(
    expect.arrayContaining(['noopener', 'noreferrer']),
  );
});
