import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { useData } from './useData';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const Resume = lazy(() => import('./pages/Resume'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center">
    <div className="text-gray-400">Loading...</div>
  </div>
);

function App() {
  const { data, loading } = useData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/resume" element={<Resume data={data} />} />
            <Route path="/projects" element={<Projects data={data} />} />
            <Route path="/contact" element={<Contact data={data} />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
