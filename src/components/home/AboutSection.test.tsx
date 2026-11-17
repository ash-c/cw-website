import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithProviders } from '../../testing/render';
import { AboutSection } from './AboutSection';

it('introduces Ash and presents a portrait with alternative text', () => {
  renderWithProviders(<AboutSection />);

  expect(screen.getByRole('heading', { level: 2, name: 'About me' })).toBeVisible();
  expect(
    screen.getByText(/full-stack software engineer based in Taranaki, New Zealand/),
  ).toBeVisible();
  expect(screen.getByRole('img', { name: 'Placeholder portrait' })).toHaveAttribute(
    'src',
    expect.stringMatching(/\S/),
  );
});
