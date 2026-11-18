import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { expect, it } from 'vitest';
import { renderWithProviders } from '../../testing/render';
import { HeroSection } from './HeroSection';

it('introduces Ash and lets keyboard users open the projects page', async () => {
  const { user } = renderWithProviders(
    <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/projects" element={<h1>Projects content</h1>} />
    </Routes>,
  );

  expect(screen.getByRole('heading', { level: 1, name: 'Ash Crockett' })).toBeVisible();
  expect(screen.getByText('Full-stack software engineer')).toBeVisible();
  expect(screen.getByText(/Based in Taranaki, NZ/)).toBeVisible();

  const projects = screen.getByRole('link', { name: 'View my work' });
  expect(projects).toHaveAttribute('href', '/projects');

  await user.tab();
  expect(projects).toHaveFocus();
  await user.keyboard('{Enter}');

  expect(await screen.findByRole('heading', { name: 'Projects content' })).toBeVisible();
});
