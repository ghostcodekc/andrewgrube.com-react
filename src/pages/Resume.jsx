const Resume = ({ data }) => {
  if (!data) return null;

  return (
    <div className="max-w-3xl mx-auto w-full space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white tracking-tight">Experience</h2>
        <div className="w-12 h-1 bg-emerald-500 rounded-full" />
      </div>

      <div className="relative space-y-12">
        {/* Timeline Vertical Line */}
        <div className="absolute left-0 sm:left-6 top-2 bottom-0 w-[1px] bg-zinc-800" />

        {data.resume.map((job) => (
          <div key={job.id} className="relative pl-8 sm:pl-20 group">
            {/* Timeline Dot */}
            <div className="absolute left-[-4.5px] sm:left-[20px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700 group-hover:bg-emerald-500 group-hover:border-emerald-400 transition-all duration-300" />
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {job.role}
                </h3>
                <span className="text-xs font-semibold tracking-widest uppercase text-emerald-500/80 sm:text-right whitespace-nowrap">
                  {job.period}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 text-zinc-400 font-medium text-sm">
                <span className="text-zinc-500">at</span>
                <span className="text-zinc-200">{job.company}</span>
              </div>

              <p className="text-zinc-400 leading-relaxed text-sm sm:text-base font-light">
                {job.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <a 
          href={data.resumeLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 px-8 py-3 bg-white text-zinc-950 hover:bg-emerald-500 hover:text-white font-bold rounded-full shadow-xl transition-all active:scale-95"
        >
          <span>Download Full CV</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};
export default Resume;
