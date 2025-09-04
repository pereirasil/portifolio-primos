import React, { useState } from 'react';
import { GlobalStyles } from './styles/GlobalStyles';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './sections/ProjectsSection';
import Footer from './sections/Footer';

/**
 * Main App component for Code Primos portfolio
 * Renders all sections with global styles
 */
function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <>
      <GlobalStyles />
      <div className="App">
        <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
        <div id="home">
          <HeroSection />
        </div>
        <div id="projects">
          <ProjectsSection />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
