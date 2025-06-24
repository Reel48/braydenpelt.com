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
          <img src="/movies_logo.png" alt="Movies Logo" className="h-24" />
        </div>
        <div id="letterboxd-embed-wrapper-tc" className="embed-green-bg">Loading...</div>
        <div className="mt-16">
          <h2 className="text-center text-2xl font-bold mb-8" style={{ fontFamily: 'TAYLennon, sans-serif', color: 'var(--color-green)' }}>Favorite Films</h2>
          <div className="flex flex-row justify-center items-center gap-6 w-full overflow-x-auto" style={{ flexWrap: 'nowrap' }}>
            <img src="/movie_posters/barry_lyndon.png" alt="Barry Lyndon" className="h-32 w-24 object-cover rounded-lg shadow" />
            <img src="/movie_posters/grand_budapest_hotel.png" alt="The Grand Budapest Hotel" className="h-32 w-24 object-cover rounded-lg shadow" />
            <img src="/movie_posters/la_la_land.png" alt="La La Land" className="h-32 w-24 object-cover rounded-lg shadow" />
            <img src="/movie_posters/life_is_beautiful.png" alt="Life is Beautiful" className="h-32 w-24 object-cover rounded-lg shadow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoviesSection; 