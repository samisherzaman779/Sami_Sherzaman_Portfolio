import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

/** Replace this array with real projects when ready. */
export const projectsData = [
  {
    id: 'proj-01',
    title: 'E-Commerce Dashboard',
    description:
      'Admin dashboard with inventory, orders, and analytics. Dummy copy — swap with your real case study.',
    category: 'Web App',
    year: '2025',
    image: '/projects_images/sam-store_image.png',
    tags: ['Next.js', 'TypeScript', 'Supabase'],
    gradient: 'from-brand via-brand-light to-slate-700',
    liveUrl: 'https://samstore-peach.vercel.app',
    repoUrl: 'https://github.com/samisherzaman779/samstore',
  },
  {
    id: 'proj-02',
    title: 'AI Content Assistant',
    description:
      'LLM-powered writing helper with prompts and history. Placeholder project for portfolio layout.',
    category: 'AI',
    year: '2025',
    image: '/projects_images/Sam.AI-image.png',
    tags: ['Python', 'OpenAI API', 'FastAPI'],
    gradient: 'from-slate-900 via-brand-dark to-brand',
    liveUrl: 'https://samai-three.vercel.app/',
    repoUrl: 'https://github.com/samisherzaman779/Sam.AI',
  },
  {
    id: 'proj-03',
    title: 'Portfolio & Reel Site',
    description:
      'Cinematic personal site with video hero and smooth scroll sections. Template for your reel work.',
    category: 'Frontend',
    year: '2024',
    image: '/projects_images/portfolio-reel-site.png',
    tags: ['React', 'Tailwind CSS', 'Vue.js'],
    gradient: 'from-gray-800 via-brand to-gray-900',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 'proj-04',
    title: 'Task Collaboration Hub',
    description:
      'Team boards, real-time updates, and role-based access. Dummy data until production links are added.',
    category: 'Web App',
    year: '2024',
    image: '/projects_images/task-collaboration-hub.png',
    tags: ['TypeScript', 'PostgreSQL', 'Redis'],
    gradient: 'from-brand-light via-slate-600 to-brand-dark',
    liveUrl: 'https://asz-stitching-management-system.vercel.app/dashboard',
    repoUrl: 'https://github.com/samisherzaman779/ASZ-Stichting',
  },
  {
    id: 'proj-05',
    title: 'Market Data Extractor',
    description:
      'Scheduled scraping and ETL into structured exports. Placeholder for a data extraction client project.',
    category: 'Data',
    year: '2024',
    image: '/projects_images/market-data-extractor.png',
    tags: ['Python', 'Pandas', 'AWS'],
    gradient: 'from-zinc-800 via-brand-dark to-black',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 'proj-06',
    title: 'Computer Vision Demo',
    description:
      'Object detection prototype with a simple web UI. Replace with your ML project details and metrics.',
    category: 'AI',
    year: '2023',
    image: '/projects_images/computer-vision-demo.png',
    tags: ['Python', 'OpenCV', 'TensorFlow'],
    gradient: 'from-indigo-950 via-brand to-slate-800',
    liveUrl: 'https://samai-three.vercel.app/',
    repoUrl: '#',
  },
];

const FILTERS = ['All', 'Web App', 'AI', 'Frontend', 'Data'];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      type: 'spring',
      stiffness: 90,
      damping: 14,
    },
  }),
};

const ProjectCard = ({ project, index }) => (
  <motion.article
    custom={index}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    whileHover={{ y: -6 }}
    className="group flex flex-col bg-white border border-black/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand/10 transition-shadow duration-500"
  >
    {/* Project hero image */}
    <div
      className={`relative aspect-[16/10] bg-gradient-to-br ${project.gradient} overflow-hidden`}
    >
      <img
        src={project.image}
        alt={`${project.title} project preview`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        onError={(event) => {
          event.currentTarget.style.display = 'none';
        }}
      />
    </div>

    <div className="p-6 flex flex-col flex-1">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight group-hover:text-brand transition-colors">
          {project.title}
        </h3>
        <span className="shrink-0 text-xs font-mono text-gray-400">{project.year}</span>
      </div>
      <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
        <a
          href={project.liveUrl}
          className="text-xs font-bold text-brand hover:text-brand-dark underline underline-offset-4 decoration-brand/30"
          onClick={(e) => project.liveUrl === '#' && e.preventDefault()}
        >
          Live demo
        </a>
        <a
          href={project.repoUrl}
          className="text-xs font-bold text-gray-600 hover:text-gray-900 underline underline-offset-4 decoration-gray-300"
          onClick={(e) => project.repoUrl === '#' && e.preventDefault()}
        >
          Source
        </a>
      </div>
    </div>
  </motion.article>
);

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projectsData;
    return projectsData.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="projects"
      className="relative w-full bg-[#f8f9fb] py-20 md:py-28 px-6 md:px-12 overflow-hidden font-sans"
    >
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <span className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-6 shadow-sm bg-white">
            Selected Work
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Projects
          </h2>
          <p className="text-gray-500 text-base max-w-2xl font-medium leading-relaxed">
            Dummy entries for layout and navigation — replace titles, descriptions, links, and thumbnails
            with your real work when ready.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10 md:mb-12">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 border ${
                  isActive
                    ? 'bg-brand text-white border-brand shadow-md shadow-brand/20'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-brand/30 hover:text-brand'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-gray-500 text-sm py-16">No projects in this category yet.</p>
        )}
      </div>
    </section>
  );
};

export default Projects;
