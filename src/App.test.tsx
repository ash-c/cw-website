import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, expect, it } from 'vitest';
import { App } from './App';

beforeEach(() => window.history.replaceState(null, '', '/'));
afterEach(() => window.history.replaceState(null, '', '/'));

it('opens the home page and follows its project link', async () => {
  const user = userEvent.setup();
  render(<App />);

  expect(await screen.findByRole('heading', { level: 1, name: 'Ash Crockett' })).toBeVisible();
  expect(window.location.pathname).toBe('/');

  await user.click(screen.getByRole('link', { name: 'View my work' }));

  expect(await screen.findByRole('heading', { level: 1, name: 'Projects' })).toBeVisible();
  expect(window.location.pathname).toBe('/projects');
});

it('opens the projects page directly at /projects', async () => {
  window.history.replaceState(null, '', '/projects');
  render(<App />);

  expect(await screen.findByRole('heading', { level: 1, name: 'Projects' })).toBeVisible();
  expect(screen.getByRole('heading', { level: 2, name: 'Project One' })).toBeVisible();
});

it('navigates from Home to Projects and back via the header', async () => {
  const user = userEvent.setup();
  render(<App />);

  expect(await screen.findByRole('heading', { level: 1, name: 'Ash Crockett' })).toBeVisible();
  const header = within(screen.getByRole('banner'));

  await user.click(header.getByRole('link', { name: 'Projects' }));
  expect(await screen.findByRole('heading', { level: 1, name: 'Projects' })).toBeVisible();
  expect(window.location.pathname).toBe('/projects');

  await user.click(header.getByRole('link', { name: 'Home' }));
  expect(await screen.findByRole('heading', { level: 1, name: 'Ash Crockett' })).toBeVisible();
  expect(window.location.pathname).toBe('/');
});
