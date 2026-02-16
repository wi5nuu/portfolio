import { useEffect } from 'react';
import './index.css';
import useLenis from './hooks/useLenis';
import { siteConfig } from './config';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import AIChat from './components/AIChat';

function App() {
  // Initialize Lenis smooth scrolling
  useLenis();

  useEffect(() => {
    // Set page title from config
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }

    // Add viewport meta for better mobile experience
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    if (siteConfig.description) {
      metaDescription.setAttribute('content', siteConfig.description);
    }
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-void-black overflow-x-hidden">
      {/* Hero Section - Immersive landing */}
      <Hero />

      {/* About Section - Profile and stats */}
      <About />

      {/* Experience Section - Work timeline */}
      <Experience />

      {/* Projects Section - Portfolio showcase */}
      <Projects />

      {/* Skills Section - Tech stack */}
      <Skills />

      {/* Education Section - Education and certifications */}
      <Education />

      {/* Contact Section - Contact form */}
      <Contact />

      {/* Footer Section */}
      <Footer />

      {/* AI Chat Widget */}
      <AIChat />
    </main>
  );
}

export default App;
