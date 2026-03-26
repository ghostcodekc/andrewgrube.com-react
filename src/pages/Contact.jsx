const Contact = ({ data }) => {
  if (!data) return null;

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12 py-12 w-full max-w-xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tighter">Get in Touch</h2>
        <div className="w-12 h-1 bg-emerald-500 rounded-full mx-auto" />
      </div>

      <p className="text-zinc-400 leading-relaxed text-lg sm:text-xl font-light">
        I'm always open to discussing new opportunities, SRE challenges, or technical collaborations. 
        Drop me a message through the form below.
      </p>
      
      <div className="pt-6">
        <a 
          href={data.contactLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-emerald-600 rounded-full hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] active:scale-95"
        >
          <span className="relative flex items-center space-x-2">
            <span>Send a Message</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </a>
      </div>

      <div className="pt-12 text-zinc-500 text-sm font-medium tracking-widest uppercase">
        Kansas City, MO / Remote
      </div>
    </div>
  );
};
export default Contact;
