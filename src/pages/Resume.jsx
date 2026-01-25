const Resume = ({ data }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-2">Experience</h2>
      <div className="space-y-8">
        {data.resume.map((job) => (
          <div key={job.id} className="relative pl-6 border-l-2 border-gray-700">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-800"></div>
            <h3 className="text-lg font-semibold text-white">{job.role}</h3>
            <span className="text-sm text-blue-400 block mb-1">{job.company} • {job.period}</span>
            <p className="text-gray-400 text-sm">{job.description}</p>
          </div>
        ))}
        <div className="flex flex-col items-center justify-center text-center space-y-6 h-full py-10 animate-fade-in">
      <a 
        href={data.resumeLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1"
      >
        Get full resume
      </a>
    </div>
      </div>
    </div>
  );
};
export default Resume;
