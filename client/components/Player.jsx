import React from 'react';
import { Center, Text } from '@chakra-ui/react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = () => {
  <div>
    <Center>
      <Text bgGradient="linear(to-l, #7928CA,#FF0080)" bgClip="text" fontSize="6xl" fontWeight="extrabold">
        Welcome to Chakra UI
      </Text>
      <SpotifyPlayer token="" uris={[]} />
    </Center>
  </div>;
};

export default Player;
