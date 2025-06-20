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
    <section style={{ backgroundColor: '#292c2f' }} className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-12">
          <img src="/Brayden_Spotify_Logo.png" alt="Brayden Spotify Logo" className="h-24" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
          {playlistUrls.map((url, index) => (
            <Spotify key={index} link={url} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpotifySection; 