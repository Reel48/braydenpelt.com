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
    <section className="bg-white text-gray-900 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">My Spotify Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {playlistUrls.map((url, index) => (
            <Spotify key={index} link={url} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpotifySection; 