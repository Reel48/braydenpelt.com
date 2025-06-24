import React from 'react';
import { Spotify } from 'react-spotify-embed';

const SpotifySection = () => {
  // TODO: Replace with actual playlist URLs
  const playlistUrls = [
    'https://open.spotify.com/playlist/4TfPPw4bFSdS8wll6PY5rW',
    'https://open.spotify.com/playlist/0sgca4DLP195nWzRbkN8ZB',
    'https://open.spotify.com/playlist/0eYoFYhpqZ3flBUdCfaKAY'
  ];

  return (
    <section style={{ backgroundColor: 'var(--color-brand-custom-order)' }} className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-12">
          <img src="/spotify_logo_pelt.png" alt="Spotify Logo Pelt" className="h-24" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
          <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/playlist/4TfPPw4bFSdS8wll6PY5rW?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Brayden's Playlist"
          ></iframe>
          <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/playlist/0sgca4DLP195nWzRbkN8ZB?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Brayden's Alternate Playlist"
          ></iframe>
          <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/playlist/0eYoFYhpqZ3flBUdCfaKAY?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Old Music Playlist"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default SpotifySection; 