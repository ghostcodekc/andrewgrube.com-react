const Projects = ({ data }) => {
  if (!data) return null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white tracking-tight">Selected Projects</h2>
        <div className="w-12 h-1 bg-emerald-500 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        {data.projects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col space-y-4"
          >
            {/* Image Container */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 group-hover:border-emerald-500/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent z-10" />
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100"
              />
            </div>

            {/* Content */}
            <div className="space-y-2 px-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <svg className="w-5 h-5 text-zinc-600 group-hover:text-emerald-500 transform -rotate-45 group-hover:rotate-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <p className="text-zinc-400 font-light leading-relaxed">
                {project.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
export default Projects;
