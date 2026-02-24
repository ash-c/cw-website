export type Project = {
  title: string;
  description: string;
  techStack: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    title: "Project One",
    description:
      "Short description of a project you are proud of. Mention the problem it solves and your role.",
    techStack: ["TypeScript", "React", "Node.js"],
    link: "#",
  },
  {
    title: "Project Two",
    description:
      "Another project with a brief summary of the functionality and impact.",
    techStack: ["Python", "FastAPI", "PostgreSQL"],
    link: "#",
  },
  {
    title: "Project Three",
    description:
      "Describe a project that highlights a different skill set or domain.",
    techStack: ["Go", "gRPC", "Kubernetes"],
  },
];

