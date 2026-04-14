const Home = ({ data }) => {
  if (!data) return null;
  
  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-12">
      {/* Profile Image & Intro */}
      <div className="flex flex-col items-center space-y-6">
        <div className="group relative w-32 h-32 sm:w-40 sm:h-40">
          <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all duration-700" />
          <img 
            src={data.profile.avatar} 
            alt="Profile" 
            className="relative z-10 rounded-full w-full h-full object-cover border-2 border-zinc-800 shadow-xl group-hover:border-emerald-500/30 transition-colors duration-500"
          />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tighter">
            {data.profile.name}
          </h1>
          <p className="text-emerald-500 font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm">
            {data.profile.title}
          </p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="relative">
        <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent hidden sm:block" />
        <p className="text-zinc-400 leading-relaxed text-lg sm:text-xl font-light max-w-xl mx-auto px-2">
          {data.profile.bio}
        </p>
      </div>

      {/* Social Links */}
      <div className="flex flex-wrap justify-center gap-4 pt-4">
        {data.profile.socials.map((social) => (
          <a 
            key={social.name}
            href={social.url} 
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 glass hover:bg-zinc-800 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 border border-zinc-800 hover:border-emerald-500/30"
          >
            {social.name}
          </a>
        ))}
      </div>
    </div>
  );
};
export default Home;
