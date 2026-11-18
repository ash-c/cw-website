import { screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithProviders } from '../testing/render';
import { Layout } from './Layout';

it('shows the site header and footer and places page content in one main landmark', () => {
  renderWithProviders(
    <Layout>
      <h1>Example page</h1>
    </Layout>,
  );

  expect(screen.getByRole('banner')).toBeVisible();
  const main = screen.getByRole('main');
  expect(within(main).getByRole('heading', { name: 'Example page' })).toBeVisible();
  expect(screen.getByRole('contentinfo')).toBeVisible();
});
