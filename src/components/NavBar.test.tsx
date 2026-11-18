import { screen, within } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { expect, it } from 'vitest';
import { renderWithProviders } from '../testing/render';
import { NavBar } from './NavBar';

it('shows the site brand, navigation, and social links in the header', () => {
  renderWithProviders(<NavBar />);

  const header = within(screen.getByRole('banner'));
  expect(header.getByText('Ash Crockett')).toBeVisible();
  expect(header.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  expect(header.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
  expect(header.getByRole('link', { name: 'GitHub' })).toBeVisible();
  expect(header.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
});

it('navigates to the projects route when Projects is clicked', async () => {
  const { user } = renderWithProviders(
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Home content</h1>} />
        <Route path="/projects" element={<h1>Projects content</h1>} />
      </Routes>
    </>,
  );

  await user.click(screen.getByRole('link', { name: 'Projects' }));

  expect(await screen.findByRole('heading', { name: 'Projects content' })).toBeVisible();
});
