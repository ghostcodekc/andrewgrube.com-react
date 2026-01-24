const Contact = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 h-full py-10 animate-fade-in">
      <h2 className="text-2xl font-bold text-white">Get in Touch</h2>
      <p className="text-gray-300 max-w-sm">
        Click the button below to fill out my inquiry form.
      </p>
      
      <a 
        href={data.contactLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1"
      >
        Go to Contact Form
      </a>
    </div>
  );
};
export default Contact;
