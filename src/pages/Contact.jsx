import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = ({ data }) => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState({ type: null, message: '' });

  if (!data) return null;

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setState({ type: null, message: '' });

    // Use environment variables for EmailJS credentials
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || SERVICE_ID === 'your_service_id') {
      setState({ 
        type: 'error', 
        message: 'EmailJS is not yet configured. Please add your credentials to a .env file (see .env.example).' 
      });
      setIsSubmitting(false);
      return;
    }

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          setState({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
          form.current.reset();
      }, (error) => {
          setState({ type: 'error', message: 'Something went wrong. Please try again or reach out via LinkedIn.' });
          console.error('EmailJS Error:', error);
      })
      .finally(() => {
          setIsSubmitting(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 py-12 w-full max-w-2xl mx-auto px-4">
      <div className="space-y-4">
        <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tighter">Get in Touch</h2>
        <div className="w-12 h-1 bg-emerald-500 rounded-full mx-auto" />
      </div>

      <p className="text-zinc-400 leading-relaxed text-lg font-light max-w-lg">
        I'm always open to discussing new opportunities, SRE challenges, or technical collaborations. 
        Drop me a message and I'll get back to you as soon as possible.
      </p>

      <form 
        ref={form} 
        onSubmit={sendEmail}
        className="w-full space-y-6 text-left bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 shadow-xl backdrop-blur-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="user_name" className="text-sm font-medium text-zinc-400 ml-1">Name</label>
            <input
              type="text"
              name="user_name"
              id="user_name"
              required
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="user_email" className="text-sm font-medium text-zinc-400 ml-1">Email</label>
            <input
              type="email"
              name="user_email"
              id="user_email"
              required
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-zinc-400 ml-1">Message</label>
          <textarea
            name="message"
            id="message"
            required
            rows="5"
            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none"
            placeholder="How can I help you?"
          ></textarea>
        </div>

        {state.message && (
          <div className={`p-4 rounded-xl text-sm ${
            state.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full group relative flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-emerald-600 rounded-xl hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Sending...</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <span>Send Message</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default Contact;

