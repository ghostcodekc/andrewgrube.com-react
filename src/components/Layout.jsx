import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Resume', path: '/resume' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl h-[90vh] bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
        
        {/* Navigation Bar */}
        <nav className="flex justify-center space-x-4 sm:space-x-8 p-6 border-b border-gray-700 flex-shrink-0">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm sm:text-base font-medium transition-colors duration-200 ${
                location.pathname === item.path
                  ? 'text-blue-400 border-b-2 border-blue-400 pb-1'
                  : 'text-gray-400 hover:text-white pb-1'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-10 flex flex-col items-center justify-center">
          {children}
        </main>

        {/* Footer */}
        <footer className="p-4 text-center text-xs text-gray-500 border-t border-gray-700 flex-shrink-0">
          © {new Date().getFullYear()} - Built with 💚 in Kansas City
        </footer>
      </div>
    </div>
  );
};

export default Layout;
