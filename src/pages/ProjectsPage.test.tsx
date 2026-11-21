import { screen, within } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { expect, it } from 'vitest';
import { projects, type Project } from '../data/projects';
import { renderWithProviders } from '../testing/render';
import { ProjectsPage } from './ProjectsPage';

const cardFor = (title: string) =>
  screen.getByRole('heading', { level: 2, name: title }).parentElement!;

const expectSecureExternalLink = (link: HTMLElement, href: string) => {
  expect(link).toHaveAttribute('href', href);
  expect(link).toHaveAttribute('target', '_blank');
  expect(link.getAttribute('rel')?.split(/\s+/)).toEqual(
    expect.arrayContaining(['noopener', 'noreferrer']),
  );
};

const withExtraProjects = async (extra: Project[], run: () => Promise<void> | void) => {
  const originalLength = projects.length;
  projects.push(...extra);
  try {
    await run();
  } finally {
    projects.splice(originalLength);
  }
};

it('shows the real projects in order with their summaries and technologies', () => {
  renderWithProviders(<ProjectsPage />);

  expect(screen.getByRole('heading', { level: 1, name: 'Projects' })).toBeVisible();
  expect(
    screen.getByText('A selection of my personal projects and professional work.'),
  ).toBeVisible();
  expect(
    screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent),
  ).toEqual(['Portfolio Website', 'Access APS NZ']);

  for (const { title, description, techStack } of projects) {
    const card = within(cardFor(title));
    expect(card.getByText(description)).toBeVisible();
    for (const technology of techStack) {
      expect(card.getByText(technology)).toBeVisible();
    }
  }

  expect(screen.getByText(/The Access Group NZ/)).toBeVisible();
  expect(screen.queryByText(/Project (One|Two|Three)/)).not.toBeInTheDocument();
  expect(screen.queryByText(/Replace these placeholders/)).not.toBeInTheDocument();
});

it('shows the portfolio as a summary-only card without any call to action', () => {
  renderWithProviders(<ProjectsPage />);

  const card = within(cardFor('Portfolio Website'));
  expect(card.queryByRole('link')).not.toBeInTheDocument();
  expect(card.queryByRole('button')).not.toBeInTheDocument();
  expect(card.queryByText(/View Project|Read more/)).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Portfolio Website' })).not.toBeInTheDocument();
});

it('makes the whole APS card a single link to its detail page', () => {
  renderWithProviders(<ProjectsPage />);

  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(1);
  const [link] = links;
  expect(link).toHaveAccessibleName('Access APS NZ');
  expect(link).toHaveAttribute('href', '/projects/access-aps-nz');
  expect(link).not.toHaveAttribute('target');

  const card = within(link);
  expect(card.getByRole('heading', { level: 2, name: 'Access APS NZ' })).toBeVisible();
  expect(card.getByText(/I primarily work on APS NZ Tax/)).toBeVisible();
  expect(card.getByText('Kafka')).toBeVisible();
  expect(card.getByText('Read more')).toBeVisible();
  expect(card.queryByRole('link')).not.toBeInTheDocument();
  expect(card.queryByRole('button')).not.toBeInTheDocument();
  expect(screen.queryByText(/youtube/i)).not.toBeInTheDocument();
});

it('opens the APS detail route when the focused card is activated with Enter', async () => {
  const { user } = renderWithProviders(
    <Routes>
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:slug" element={<h1>Detail route</h1>} />
    </Routes>,
    { initialEntries: ['/projects'] },
  );

  await user.tab();
  expect(screen.getByRole('link', { name: 'Access APS NZ' })).toHaveFocus();
  await user.keyboard('{Enter}');

  expect(screen.getByRole('heading', { level: 1, name: 'Detail route' })).toBeVisible();
});

it('renders any number of additional projects, preferring detail pages over external links', async () => {
  const extra: Project[] = [
    {
      slug: 'external-tool',
      title: 'External Tool',
      description: 'A much longer description '.repeat(12).trim(),
      techStack: ['Go', 'gRPC', 'Kubernetes', 'PostgreSQL', 'Terraform', 'Docker', 'Redis'],
      link: 'https://example.com/tool',
    },
    {
      slug: 'detailed-library',
      title: 'Detailed Library',
      description: 'A library with both a detail page and a public site.',
      techStack: ['TypeScript'],
      link: 'https://example.com/library',
      details: { introduction: 'Intro', sections: [] },
    },
    {
      slug: 'odd-one-out',
      title: 'Odd One Out',
      description: 'A summary-only card in an incomplete final row.',
      techStack: ['Rust'],
    },
  ];

  await withExtraProjects(extra, () => {
    renderWithProviders(<ProjectsPage />);

    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(5);

    const external = screen.getByRole('link', { name: 'External Tool' });
    expectSecureExternalLink(external, 'https://example.com/tool');
    expect(within(external).getByText('View Project')).toBeVisible();
    expect(within(external).getByText('Redis')).toBeVisible();
    expect(within(external).queryByRole('link')).not.toBeInTheDocument();

    const detailed = screen.getByRole('link', { name: 'Detailed Library' });
    expect(detailed).toHaveAttribute('href', '/projects/detailed-library');
    expect(within(detailed).getByText('Read more')).toBeVisible();

    expect(within(cardFor('Odd One Out')).queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });

  expect(projects.map(({ slug }) => slug)).toEqual(['portfolio-website', 'access-aps-nz']);
});
