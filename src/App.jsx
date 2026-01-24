import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { useData } from './useData';

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
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/resume" element={<Resume data={data} />} />
          <Route path="/projects" element={<Projects data={data} />} />
          <Route path="/contact" element={<Contact data={data} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
