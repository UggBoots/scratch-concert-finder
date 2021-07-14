import React from 'react';
import { Text } from '@chakra-ui/react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ spotifyToken, playlist }) => {
  const playerStyle = {
    bgColor: '#000000',
    color: '#dbdbdb',
    sliderHandleColor: '#dbdbdb',
    sliderColor: 'yellowgreen',
    sliderTrackColor: '#000000',
    trackNameColor: '#dbdbdb',
    fontFamily: "'Helvetica Neue', sans-serif",
    marginBottom: '20px',
    fontSize: '18px',
  };

  return (
    <div className="searchResults">
      <div className="spotify" style={{ width: '47%', marginTop: '20px', backgroundColor: 'none' }}>
        <SpotifyPlayer token={spotifyToken} uris={[playlist[0].track.uri]} styles={playerStyle} />
      </div>
      <p style={{ fontSize: '18px', fontWeight: 400 }}>
        {playlist[0].artist.name} is playing at {playlist[0].venue} soon!
      </p>
      <p style={{ fontSize: '18px', fontWeight: 400 }}>
        {' '}
        <a href={playlist[0].ticketsLink}>Click here to buy tickets!</a>{' '}
      </p>
    </div>
  );
};

export default Player;
