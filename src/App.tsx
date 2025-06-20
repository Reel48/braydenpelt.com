import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FaqSection from './components/FaqSection';
import SpotifySection from './components/SpotifySection';
import FooterSection from './components/FooterSection';
import NotFound from './pages/NotFound';

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FaqSection />
      <SpotifySection />
      <FooterSection />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
