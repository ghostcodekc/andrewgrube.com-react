const Home = ({ data }) => {
  if (!data) return null;
  
  return (
    <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40">
        <img 
          src={data.profile.avatar} 
          alt="Profile" 
          className="rounded-full w-full h-full object-cover border-4 border-gray-700 shadow-lg"
        />
      </div>
      
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          {data.profile.name}
        </h1>
        <p className="text-blue-400 font-medium tracking-wide uppercase text-sm">
          {data.profile.title}
        </p>
      </div>

      <p className="text-gray-300 leading-relaxed max-w-md text-left">
        {data.profile.bio}
      </p>

      <div className="flex space-x-4 pt-4">
        {data.profile.socials.map((social) => (
          <a 
            key={social.name}
            href={social.url} 
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-all"
          >
            {social.name}
          </a>
        ))}
      </div>
    </div>
  );
};
export default Home;
