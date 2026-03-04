import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import GTMNoscript from './components/GTMNoscript';
import LandingPage from './pages/LandingPage';
import CalculatorsPage from './pages/CalculatorsPage';
import SubscriberCalculatorPage from './pages/SubscriberCalculatorPage';
import VoipCalculatorPage from './pages/VoipCalculatorPage';
import ConcurrentCallsCalculatorPage from './pages/ConcurrentCallsCalculatorPage';
import HelpPage from './pages/HelpPage';
import { initGTM } from './utils/gtm';

function App() {
  useEffect(() => {
    initGTM();
  }, []);

  return (
    <Router>
      <GTMNoscript />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/calculators" element={<CalculatorsPage />} />
            <Route path="/calculators/subscriber" element={<SubscriberCalculatorPage />} />
            <Route path="/calculators/voip-subscriber" element={<VoipCalculatorPage />} />
            <Route path="/calculators/concurrent-calls" element={<ConcurrentCallsCalculatorPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App
