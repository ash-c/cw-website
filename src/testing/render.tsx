import { ChakraProvider } from '@chakra-ui/react';
import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom';
import { system } from '../theme';

type ProviderRenderOptions = Omit<RenderOptions, 'wrapper'> &
  Pick<MemoryRouterProps, 'initialEntries'>;

export const renderWithProviders = (
  ui: ReactElement,
  { initialEntries = ['/'], ...options }: ProviderRenderOptions = {},
) => ({
  user: userEvent.setup(),
  ...render(ui, {
    ...options,
    wrapper: ({ children }) => (
      <ChakraProvider value={system}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </ChakraProvider>
    ),
  }),
});
