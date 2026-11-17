import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { renderWithProviders } from '../../testing/render';
import { SkillsSection } from './SkillsSection';

it('describes all skill groups and lists their technologies', () => {
  renderWithProviders(<SkillsSection />);

  expect(screen.getByRole('heading', { level: 2, name: 'Skills & expertise' })).toBeVisible();

  const groups = [
    { name: 'Front-end', description: /GraphQL and Apollo for data fetching/ },
    { name: 'Back-end & cloud', description: /event streaming with Kafka/ },
    { name: 'AI-assisted development', description: /Agentic coding with Devin/ },
    { name: 'Soft skills', description: /Teamwork, mentoring, problem solving/ },
  ];
  for (const { name, description } of groups) {
    expect(screen.getByRole('heading', { level: 3, name })).toBeVisible();
    expect(screen.getByText(description)).toBeVisible();
  }

  for (const technology of [
    'TypeScript',
    'React',
    'GraphQL',
    'Apollo',
    'Node.js',
    'AWS',
    'Serverless',
    'Kafka',
    'Devin',
  ]) {
    expect(screen.getByText(technology)).toBeVisible();
  }
});
