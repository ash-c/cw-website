import { screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { projects } from '../data/projects';
import { renderWithProviders } from '../testing/render';
import { ProjectsPage } from './ProjectsPage';

it('shows the title, description, and technologies for each project', () => {
  renderWithProviders(<ProjectsPage />);

  expect(screen.getByRole('heading', { level: 1, name: 'Projects' })).toBeVisible();
  expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(projects.length);
  for (const { title, description, techStack } of projects) {
    const heading = screen.getByRole('heading', { level: 2, name: title });
    const card = within(heading.parentElement!);
    expect(heading).toBeVisible();
    expect(card.getByText(description)).toBeVisible();
    for (const technology of techStack) {
      expect(card.getByText(technology)).toBeVisible();
    }
  }

  expect(screen.getByRole('heading', { level: 2, name: 'Project One' })).toBeVisible();
  expect(screen.getByText('PostgreSQL')).toBeVisible();
});

it('offers a standalone View Project link only for projects with a destination', () => {
  renderWithProviders(<ProjectsPage />);

  expect(screen.getAllByRole('link', { name: 'View Project' })).toHaveLength(2);
  for (const { title, link: href } of projects) {
    const heading = screen.getByRole('heading', { level: 2, name: title });
    const card = within(heading.parentElement!);
    if (href) {
      const link = card.getByRole('link', { name: 'View Project' });
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link.getAttribute('rel')?.split(/\s+/)).toEqual(
        expect.arrayContaining(['noopener', 'noreferrer']),
      );
      expect(within(link).queryByRole('button', { hidden: true })).not.toBeInTheDocument();
    } else {
      expect(card.queryByRole('link', { name: 'View Project' })).not.toBeInTheDocument();
      expect(card.queryByRole('button', { name: 'View Project' })).not.toBeInTheDocument();
    }
  }
});
