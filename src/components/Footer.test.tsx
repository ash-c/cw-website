import { screen, within } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../testing/render';
import { Footer } from './Footer';

afterEach(() => vi.useRealTimers());

it('shows the current copyright year and social links in the footer', () => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date(2030, 0, 15));
  renderWithProviders(<Footer />);

  const footer = within(screen.getByRole('contentinfo'));
  expect(footer.getByText('© 2030 Ash Crockett. All rights reserved.')).toBeVisible();
  expect(footer.getByRole('link', { name: 'GitHub' })).toBeVisible();
  expect(footer.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
});
