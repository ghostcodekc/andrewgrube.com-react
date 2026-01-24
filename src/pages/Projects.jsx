const Projects = ({ data }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-6">Selected Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data.projects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gray-700/50 rounded-xl overflow-hidden hover:bg-gray-700 transition-all cursor-pointer"
          >
            <div className="h-40 sm:h-48 bg-gray-600 flex items-center justify-center">
               <img src={project.image} alt={project.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"/>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-white mb-1">{project.title}</h3>
              <p className="text-xs text-gray-300">{project.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
export default Projects;
