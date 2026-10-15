/** Shared copy & stack — update here when profile changes. */

/** Primary email (mailto links site-wide). */
export const contact = {
  email: 'sami.sherzaman@gmail.com',
};



export const about = {
  intro:
    "I'm Sami Sherzaman, a developer passionate about building modern web applications, AI-powered solutions, and useful software that solves real-world problems.",
  focus:
    "My focus is on Full Stack Development, Applied Agentic AI, automation, and data extraction. I work with technologies like React, Next.js, JavaScript, Python, and modern AI tools to turn ideas into practical digital products.",
};



export const socialLinks = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/samisherzaman779' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/sami-sherzaman' },
  { id: 'x', label: 'X (Twitter)', href: 'https://x.com/samisherzaman' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/dev_with_sami' },
  // { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@samisherzaman2698' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/samisherzaman' },
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/923066039949' },
];

export function getActiveSocialLinks() {
  return socialLinks.filter(
    (link) =>
      typeof link.href === 'string' &&
      link.href.trim() !== ''
  );
}

export const roles = [
  'Sami Sherzaman',
  'FullStack Developer',
  'Web Developer',
  'AI Developer',
  'Data Extractor',
];

export const hero = {
  headlineRole: 'Sami Sherzaman',
  subheading:
    'I design and ship modern web apps, intelligent AI solutions, and reliable data pipelines — using React, Next.js, Python, cloud services, and the full ML toolkit.',
};

/**
 * Skills page logo grid — iconId = skillicons.dev id;
 * broken ids overridden in utils/techIconSrc.js.
 */
export const stackLogoGroups = [
  {
    id: 'frontend',
    label: 'Frontend',
    description:
      'Interfaces, styling, and modern JavaScript frameworks.',
    items: [
      { name: 'HTML5', iconId: 'html' },
      { name: 'CSS3', iconId: 'css' },
      { name: 'JavaScript', iconId: 'js' },
      { name: 'TypeScript', iconId: 'ts' },
      { name: 'React', iconId: 'react' },
      { name: 'Next.js', iconId: 'nextjs' },
      { name: 'Vue.js', iconId: 'vue' },
      { name: 'Tailwind CSS', iconId: 'tailwind' },
      { name: 'Sass', iconId: 'sass' },
      { name: 'Webpack', iconId: 'webpack' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & data',
    description:
      'APIs, databases, caching, and cloud-ready services.',
    items: [
      { name: 'Node.js', iconId: 'nodejs' },
      { name: 'Python', iconId: 'python' },
      { name: 'MongoDB', iconId: 'mongodb' },
      { name: 'PostgreSQL', iconId: 'postgres' },
      { name: 'Supabase', iconId: 'supabase' },
      { name: 'Redis', iconId: 'redis' },
      { name: 'Docker', iconId: 'docker' },
      { name: 'AWS', iconId: 'aws' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & ML',
    description:
      'Modeling, generative AI, LLM providers (OpenAI, Google, Anthropic, Groq), and intelligent product features.',
    items: [
      { name: 'Python', iconId: 'python' },
      { name: 'TensorFlow', iconId: 'tensorflow' },
      { name: 'PyTorch', iconId: 'pytorch' },
      { name: 'OpenAI', iconId: 'openai' },
      { name: 'Google AI', iconId: 'google' },
      { name: 'Anthropic', iconId: 'anthropic' },
      { name: 'Groq', iconId: 'groq' },
      { name: 'Hugging Face', iconId: 'huggingface' },
      { name: 'Pandas', iconId: 'pandas' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & workflow',
    description:
      'Version control, design handoff, and API testing.',
    items: [
      { name: 'Git', iconId: 'git' },
      { name: 'GitHub', iconId: 'github' },
      { name: 'Figma', iconId: 'figma' },
      { name: 'Postman', iconId: 'postman' },
      { name: 'Linux', iconId: 'linux' },
      { name: 'VS Code', iconId: 'vscode' },
    ],
  },
];

export const skillsData = [
  {
    category: 'Frontend Development',
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Vue.js',
      'Tailwind CSS',
      'Sass',
      'Webpack',
      'React Libraries',
      'Responsive UI',
    ],
  },
  {
    category: 'Backend & Databases',
    skills: [
      'Node.js',
      'Python',
      'TypeScript',
      'REST APIs',
      'PostgreSQL',
      'MongoDB',
      'Supabase',
      'Redis',
      'Authentication',
      'Serverless',
    ],
  },
  {
    category: 'AI & Machine Learning',
    skills: [
      'Python',
      'Machine Learning',
      'Deep Learning',
      'NLP',
      'Generative AI',
      'LLMs',
      'OpenAI',
      'Google AI',
      'Anthropic',
      'Groq',
      'Computer Vision',
      'Model Training',
      'Data Preprocessing',
      'MLOps Basics',
    ],
  },
  {
    category: 'Data Extraction & Automation',
    skills: [
      'Web Scraping',
      'Data Extraction',
      'ETL Pipelines',
      'API Integration',
      'Data Cleaning',
      'Pandas',
      'Scheduled Jobs',
      'Export & Reporting',
    ],
  },
  {
    category: 'Cloud, DevOps & Tools',
    skills: [
      'Docker',
      'AWS',
      'Cloud Services',
      'Git',
      'GitHub',
      'CI/CD',
      'Linux',
      'Postman',
      'Figma',
    ],
  },
];

export const expertiseCards = [
  {
    number: '01',
    title: 'Web & Frontend Development',
    text:
      'Responsive, accessible interfaces with HTML, CSS, JavaScript, TypeScript, React, Vue.js, Next.js, Tailwind CSS, Sass, Webpack, and modern React libraries.',
  },
  {
    number: '02',
    title: 'Backend & Full Stack Systems',
    text:
      'APIs, auth, and data layers with Node.js and Python — MongoDB, Supabase, PostgreSQL, Redis, TypeScript, and architectures built to scale.',
  },
  {
    number: '03',
    title: 'AI & Machine Learning',
    text:
      'Python-first ML workflows plus LLM integrations with OpenAI, Google AI, Anthropic, and Groq — NLP, generative AI, computer vision, and production-ready intelligent features.',
  },
  {
    number: '04',
    title: 'Data Extraction & Cloud',
    text:
      'Reliable scraping, ETL, and structured datasets; deployed and operated with Docker, AWS, Redis, and cloud services with performance in mind.',
  },
];