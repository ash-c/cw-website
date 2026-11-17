import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithProviders } from '../testing/render';
import { HomePage } from './HomePage';

it('combines the introduction, about, skills, and contact sections on the home page', () => {
  renderWithProviders(<HomePage />);

  expect(screen.getByRole('heading', { level: 1 })).toHaveAccessibleName('Ash Crockett');
  for (const name of ['About me', 'Skills & expertise', 'Get in touch']) {
    expect(screen.getByRole('heading', { level: 2, name })).toBeVisible();
  }
  expect(screen.getByRole('link', { name: 'View my work' })).toBeVisible();
  expect(screen.getByRole('link', { name: 'Connect on LinkedIn' })).toBeVisible();
});
