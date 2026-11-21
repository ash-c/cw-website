import { screen, within } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { expect, it } from 'vitest';
import { projects, type Project } from '../data/projects';
import { renderWithProviders } from '../testing/render';
import { ProjectDetailPage } from './ProjectDetailPage';

const renderDetail = (path: string) =>
  renderWithProviders(
    <Routes>
      <Route path="/projects" element={<h1>Projects list</h1>} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
    </Routes>,
    { initialEntries: [path] },
  );

const expectSecureExternalLink = (link: HTMLElement, href: string) => {
  expect(link).toHaveAttribute('href', href);
  expect(link).toHaveAttribute('target', '_blank');
  expect(link.getAttribute('rel')?.split(/\s+/)).toEqual(
    expect.arrayContaining(['noopener', 'noreferrer']),
  );
};

it('shows the APS case study with its sections, technologies, and demo link', () => {
  renderDetail('/projects/access-aps-nz');

  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.getByRole('heading', { level: 1, name: 'Access APS NZ' })).toBeVisible();
  expect(
    screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent),
  ).toEqual([
    'Overview',
    'Hybrid desktop and cloud architecture',
    'Cloud tax return preparation',
    'Broader cloud responsibilities',
    'Development approach',
    'Demo',
  ]);

  expect(screen.getAllByText(/The Access Group NZ/).length).toBeGreaterThan(0);
  expect(screen.getByText(/I primarily work on APS NZ Tax/)).toBeVisible();
  expect(screen.getByText(/file them directly with IRD/)).toBeVisible();
  expect(
    screen.getByText(/Kafka synchronises data between the two in both directions/),
  ).toHaveTextContent(/desktop software also calls cloud APIs directly/);
  expect(screen.getByText(/I led the technical planning/)).toHaveTextContent(
    /approximately 30 years old/,
  );
  expect(screen.getByText(/built and maintained by a team/)).toBeVisible();
  expect(
    screen.getByText(/security remediation and infrastructure-as-code hardening/),
  ).toBeVisible();
  expect(screen.getByText(/monitor security findings for the projects I own/)).toBeVisible();
  expect(screen.getByText(/AI-assisted development with Devin/)).toBeVisible();
  for (const technology of ['TypeScript', 'React', 'Serverless', 'AWS', 'Kafka']) {
    expect(screen.getByText(technology)).toBeVisible();
  }

  expectSecureExternalLink(
    screen.getByRole('link', { name: 'Watch the APS NZ software demo on YouTube' }),
    'https://www.youtube.com/watch?v=yV0DkaFV2pM',
  );
  expect(screen.queryByRole('heading', { name: 'Retrospective' })).not.toBeInTheDocument();
  expect(screen.queryByText(/ArmorCode|SonarQube|Mend\b/)).not.toBeInTheDocument();
  expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
});

it('returns to the projects list from the back link', async () => {
  const { user } = renderDetail('/projects/access-aps-nz');

  await user.click(screen.getByRole('link', { name: 'Back to projects' }));

  expect(screen.getByRole('heading', { level: 1, name: 'Projects list' })).toBeVisible();
});

it.each(['/projects/not-a-project', '/projects/portfolio-website'])(
  'shows a recovery link when %s has no detail page',
  async (path) => {
    const { user } = renderDetail(path);

    expect(screen.getByRole('heading', { level: 1, name: 'Project not found' })).toBeVisible();
    expect(screen.queryByText('Portfolio Website')).not.toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Back to projects' }));
    expect(screen.getByRole('heading', { level: 1, name: 'Projects list' })).toBeVisible();
  },
);

it('shows optional external and retrospective content only when provided', () => {
  const extra: Project[] = [
    {
      slug: 'full-project',
      title: 'Full Project',
      description: 'Summary',
      techStack: ['Go'],
      link: 'https://example.com/full',
      details: {
        introduction: 'Full introduction',
        sections: [{ title: 'Background', paragraphs: ['First paragraph', 'Second paragraph'] }],
        retrospective: { paragraphs: ['What I would do differently'] },
      },
    },
    {
      slug: 'empty-retrospective',
      title: 'Empty Retrospective',
      description: 'Summary',
      techStack: ['Rust'],
      details: { introduction: 'Intro', sections: [], retrospective: { paragraphs: [] } },
    },
  ];
  const originalLength = projects.length;
  projects.push(...extra);

  try {
    const { unmount } = renderDetail('/projects/full-project');
    expect(screen.getByRole('heading', { level: 1, name: 'Full Project' })).toBeVisible();
    expect(screen.getByText('Second paragraph')).toBeVisible();
    expectSecureExternalLink(
      screen.getByRole('link', { name: 'Visit Full Project' }),
      'https://example.com/full',
    );
    const retrospective = screen.getByRole('heading', { level: 2, name: 'Retrospective' });
    expect(
      within(retrospective.parentElement!).getByText('What I would do differently'),
    ).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'Demo' })).not.toBeInTheDocument();
    unmount();

    renderDetail('/projects/empty-retrospective');
    expect(screen.getByRole('heading', { level: 1, name: 'Empty Retrospective' })).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'Retrospective' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /^Visit/ })).not.toBeInTheDocument();
  } finally {
    projects.splice(originalLength);
  }

  expect(projects.map(({ slug }) => slug)).toEqual(['portfolio-website', 'access-aps-nz']);
});
