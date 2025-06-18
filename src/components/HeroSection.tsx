import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container-custom hero-content">
        {/* Desktop Hero Logo */}
        <img
          src="/Hero_Logo.png"
          alt="Hero Logo"
          className="hidden md:block h-auto w-full max-w-[600px] mx-auto mt-4 mb-8"
        />
        {/* Mobile Hero Logo */}
        <img
          src="/Hero_Logo.png"
          alt="Hero Logo"
          // All styling is now handled by consistent Tailwind classes
          className="block h-auto w-full max-w-[420px] mx-auto mt-8 mb-8 md:hidden"
        />
        <h1 className="font-semibold mb-4 md:mb-6 text-gray-heading">Your Trusted Plumbing Expert in the Texas Hill Country</h1>
        <p>Reliable, professional, and affordable plumbing solutions for your home and business.</p>
        <div className="hero-ctas">
          <a href="#contact" className="btn-primary">Schedule Service Now</a>
          <a href="tel:830-444-5195" className="btn-secondary">Call for Emergency Service</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;