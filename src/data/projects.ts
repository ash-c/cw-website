export type ProjectSection = {
  title: string;
  paragraphs: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectRetrospective = {
  paragraphs: string[];
};

export type ProjectDetails = {
  introduction: string;
  sections: ProjectSection[];
  demo?: ProjectLink;
  retrospective?: ProjectRetrospective;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  details?: ProjectDetails;
};

export const projects: Project[] = [
  {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    description:
      'I designed and built this portfolio to share my work, experience, and interests, using React, TypeScript, and Chakra UI.',
    techStack: ['React', 'TypeScript', 'Chakra UI'],
  },
  {
    slug: 'access-aps-nz',
    title: 'Access APS NZ',
    description:
      'Through my work at The Access Group NZ, I primarily develop APS NZ Tax, helping accountants prepare and file tax returns directly with IRD while moving tax preparation from desktop software to the cloud.',
    techStack: ['TypeScript', 'React', 'Serverless', 'AWS', 'Kafka'],
    details: {
      introduction:
        'APS NZ Tax is the main focus of my professional work as a software engineer at The Access Group NZ.',
      sections: [
        {
          title: 'Overview',
          paragraphs: [
            'At The Access Group NZ, I primarily develop APS NZ Tax. It helps accountants prepare tax returns and file them directly with IRD.',
          ],
        },
        {
          title: 'Hybrid desktop and cloud architecture',
          paragraphs: [
            'APS combines an established desktop application with a modern cloud website. Kafka synchronises data between the two in both directions, and the desktop software also calls cloud APIs directly.',
          ],
        },
        {
          title: 'Cloud tax return preparation',
          paragraphs: [
            'I led the technical planning for moving tax return preparation to the cloud and built its first iteration, moving preparation away from desktop software that is approximately 30 years old.',
            'This work is one part of the wider APS product, which is built and maintained by a team.',
          ],
        },
        {
          title: 'Broader cloud responsibilities',
          paragraphs: [
            'I am expanding into other areas of the APS cloud platform. I also work on security remediation and infrastructure-as-code hardening, and I monitor security findings for the projects I own.',
          ],
        },
        {
          title: 'Development approach',
          paragraphs: ['I use AI-assisted development with Devin as part of how I build software.'],
        },
      ],
      demo: {
        label: 'Watch the APS NZ software demo on YouTube',
        href: 'https://www.youtube.com/watch?v=yV0DkaFV2pM',
      },
    },
  },
];

export const getProjectDetailPath = ({ slug, details }: Project) =>
  details ? `/projects/${slug}` : undefined;

export const findProjectWithDetails = (slug: string | undefined) =>
  projects.find((project) => project.slug === slug && project.details);
