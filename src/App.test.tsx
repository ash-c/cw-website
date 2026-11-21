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
  expect(screen.getByRole('heading', { level: 2, name: 'Access APS NZ' })).toBeVisible();
});

it('opens the APS detail page directly at /projects/access-aps-nz', async () => {
  window.history.replaceState(null, '', '/projects/access-aps-nz');
  render(<App />);

  expect(await screen.findByRole('heading', { level: 1, name: 'Access APS NZ' })).toBeVisible();
  expect(
    screen.getByRole('link', { name: 'Watch the APS NZ software demo on YouTube' }),
  ).toBeVisible();
});

it('navigates from the APS card to its detail page and back to projects', async () => {
  const user = userEvent.setup();
  window.history.replaceState(null, '', '/projects');
  render(<App />);

  await user.click(await screen.findByRole('link', { name: 'Access APS NZ' }));
  expect(await screen.findByRole('heading', { level: 1, name: 'Access APS NZ' })).toBeVisible();
  expect(window.location.pathname).toBe('/projects/access-aps-nz');

  await user.click(screen.getByRole('link', { name: 'Back to projects' }));
  expect(await screen.findByRole('heading', { level: 1, name: 'Projects' })).toBeVisible();
  expect(window.location.pathname).toBe('/projects');
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
