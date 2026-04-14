import { Link, useLocation } from 'react-router-dom';
import AntigravityBackground from './AntigravityBackground';

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Resume', path: '/resume' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen relative flex flex-col items-center overflow-x-hidden">
      {location.pathname === '/' && <AntigravityBackground />}
      {/* Background Pattern - Hidden on Home */}
      {location.pathname !== '/' && (
        <>
          <div className="fixed inset-0 bg-grid -z-10 opacity-50 pointer-events-none" />
          <div className="fixed inset-0 bg-gradient-to-tr from-zinc-900 via-zinc-900 to-emerald-800/20 -z-20 pointer-events-none" />
        </>
      )}

      {/* Floating Navigation */}
      <nav className="fixed top-6 z-50 px-4">
        <div className="glass px-1.5 py-1.5 rounded-full flex items-center space-x-1 sm:space-x-2 bg-zinc-800/80">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                location.pathname === item.path
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className={`w-full flex-1 flex flex-col items-center ${location.pathname === '/' ? 'pt-32 pb-20 justify-center min-h-screen' : 'max-w-4xl px-6 pt-32 pb-20'}`}>
        <div className="w-full animate-slide-up">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-xs text-zinc-500 tracking-wider">
        © {new Date().getFullYear()} - Built with 💚 in Kansas City
      </footer>
    </div>
  );
};

export default Layout;
