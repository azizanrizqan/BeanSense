import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import FeatureCards from '../components/FeatureCards/FeatureCards';
import PredictionCard from '../components/PredictionCard/PredictionCard';
import ResultCard from '../components/ResultCard/ResultCard';
import Footer from '../components/Footer/Footer';
import CoffeeDetail from './CoffeeDetail';
import { predictBean } from '../services/api';

const Home = () => {
  const [view, setView] = useState('home'); // 'home' | 'detail'
  const [selectedBean, setSelectedBean] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async (file) => {
    setLoading(true);
    setError(null);
    setPrediction(null);
    setConfidence(null);
    
    try {
      const response = await predictBean(file);
      setPrediction(response.prediction);
      setConfidence(response.confidence);
      
      setTimeout(() => {
        const resultElement = document.getElementById('result-section');
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error occurred during classification. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartClick = () => {
    setActiveSection('predict');
    const predictElement = document.getElementById('predict');
    if (predictElement) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = predictElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCardClick = (beanType) => {
    setSelectedBean(beanType);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToHome = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="relative min-h-screen bg-cream-light text-coffee-dark flex flex-col selection:bg-coffee-medium selection:text-cream-light">
      {/* Simple ambient background glows */}
      <div className="absolute top-0 right-0 w-[45vw] h-[45vw] bg-radial from-coffee-medium/5 to-transparent blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[30vh] left-0 w-[35vw] h-[35vw] bg-radial from-coffee-dark/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* Navigation Bar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {view === 'home' ? (
        <main className="flex-grow z-10">
          {/* Hero Section */}
          <Hero onStartClick={handleStartClick} onCardClick={handleCardClick} />

          {/* Feature Cards */}
          <FeatureCards />

          {/* Classifier Section */}
          <section id="predict" className="py-20 px-6 md:px-12 relative">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
              
              <div className="text-center max-w-2xl mx-auto mb-10 flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-coffee-medium">
                  AI Inference Engine
                </span>
                <h2 className="text-3xl font-bold font-heading text-coffee-dark">
                  Live Coffee Bean Classification
                </h2>
                <p className="text-coffee-dark/75 text-sm">
                  Unggah gambar biji kopi Anda. Model KNN kami akan menghitung parameter morfologi secara instan untuk menentukan kelas biji.
                </p>
              </div>

              <PredictionCard 
                onPredict={handlePredict} 
                loading={loading} 
                error={error} 
                clearError={() => setError(null)} 
              />

              <div id="result-section" className="w-full">
                <ResultCard prediction={prediction} confidence={confidence} />
              </div>

            </div>
          </section>
        </main>
      ) : (
        <main className="flex-grow z-10">
          <CoffeeDetail beanType={selectedBean} onBack={handleBackToHome} />
        </main>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
