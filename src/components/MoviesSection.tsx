import React, { useEffect } from 'react';

const MoviesSection = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      fetch('https://lb-embed-content.bokonon.dev?username=braydenpelt')
      .then(response => response.text())
      .then(data => {
        document.getElementById('letterboxd-embed-wrapper-tc').innerHTML = data;
      });
    `;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section style={{ backgroundColor: 'var(--color-tan)' }} className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-12">
          <img src="/letterboxd-logo.png" alt="Letterboxd Logo" className="h-24" />
        </div>
        <div id="letterboxd-embed-wrapper-tc" className="embed-green-bg">Loading...</div>
      </div>
    </section>
  );
};

export default MoviesSection; 