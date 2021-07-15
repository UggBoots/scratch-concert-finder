import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  Box,
  Image,
  Input,
  Center,
  Copyright,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  Text,
  Stack,
  Footer,
  Slide
} from '@chakra-ui/react';
import { InfoOutlineIcon, CalendarIcon, SmallCloseIcon } from '@chakra-ui/icons';
import SpotifyPlayer from 'react-spotify-web-playback';
import FetchMapSearchResults from '../api/FetchMapSearchResults';
import FetchPlaylist from '../api/FetchPlaylist';
import Profile from '/client/components/Profile.jsx'
import Player from '/client/components/Player.jsx';


const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [flag, setFlag] = useState(false);
  const [clicked, setClick] = useState(false);
  const [playlist, setPlaylist] = useState([])
  const [place, setPlace] = useState(null);
  const [load, setLoad] = useState(false);
  const [renderArray, setRenderArray] = useState(null);
  const [visible, setVisible] = useState(true)

  const handleSearchForLocation = async () => {
    const results = await FetchMapSearchResults({ searchQuery: search })
    setSearchResults(results)
    
    console.log('searchResults in func', results[0].place_id);
        }

  const handlePlaylist = async (result) => {
      console.log(result)
      const playlistData = await FetchPlaylist({placeId : result.place_id})
      setPlaylist(playlistData)
      console.log('this is the playlist ', playlistData)
      setLoad(true)
      setFlag(false)
      
  }

  const handlePlayer = () => {
      setLoad(true)
      setFlag(false)
  }

  console.log('searchResults', searchResults)

  const getHashParams = () => {
    const hashParams = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    while (e === r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  const params = getHashParams();
  const token = params.access_token;
  console.log(params.access_token)

  return (
    <Box
      w="100%"
      h="100%"
      bgGradient={[
        'linear(to-tr, teal.300,yellow.400)',
        'linear(to-t, blue.200, teal.500)',
        'linear(to-b, orange.100, purple.300)',
      ]}
    >
      <Center>
        <InfoOutlineIcon onClick={onOpen} mt={10} ml="10%" mr={5} cursor="pointer" />

        {!clicked && (
          <Center
            // color='lightgray'
            fontWeight="semibold"
            fontSize="18px"
            mt={10}
            mr={5}
            cursor="pointer"
            onClick={(e) => setClick(true)}
            _hover={{
              background: 'white',
              color: 'teal.500',
            }}
          >
            Find upcoming concerts and events near you!
          </Center>
        )}

        {clicked && (
          <Input
            w="50%"
            mt={10}
            bg="white"
            mr={5}
            placeholder="Search by City, State, or Zip Code"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === 'Enter'){
                    handleSearchForLocation()
                    setVisible(false)
                    setFlag(true)
                    console.log('search results are ', searchResults)
                }
                }
            }
          />
        )}
        <CalendarIcon onClick={console.log('calendar')} mr="10%" mt={10} cursor="pointer" />
        
        <Drawer placement="left" onClose={onClose} isOpen={isOpen} w={'25%'}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Your Profile</DrawerHeader>
            <DrawerBody>
                <>
            <Profile />
            </>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Center> 


      {visible && (
        <Image
          src="client/images/Universal Recycling Symbol (U+2672).svg"
          ml="auto"
          mr="auto"
          h={750}
          _filter="blur(1.5rem)"
        />
      )}

    {flag && (
        <div className='display grid' style={{cursor: 'pointer'}}>
            {searchResults.map((result, i) => 
                <Center>
            <p 
            onClick={ ()=>
                handlePlaylist(result)
                
            }
            key={i}
            id={result.place_id}
            style={{'marginTop': '2em'}}>
                {result.description}
                
            </p>
            </Center>
            )}
            
        </div>
    )}
 
      {load && (
   <div className="display grid">
            <Text bgGradient="linear(to-l, #7928CA,#FF0080)" bgClip="text" fontSize="6xl" fontWeight="extrabold">
            Artists playing in your area!
            
            {/* {playlist[0].spotifyToken} */}
            {/* {playlist[0].track.uri} */}
            </Text>
            <div className='spotify' style={{'width': '33%'}}>
          <SpotifyPlayer 
          token={playlist[0].spotifyToken} 
          uris={[ playlist[0].track.uri ]} 
          styles={{bgColor:'#000000',
           color:'#dbdbdb',
           sliderHandleColor: '#dbdbdb',
           sliderColor: 'yellowgreen',
           sliderTrackColor: '#000000',
           trackNameColor:'#dbdbdb',
           'font-family': "'Helvetica Neue', sans-serif",
           'margin-bottom': '20px'}} />
           </div>
          <Text>
              {playlist[0].artist.name} is playing at {playlist[0].venue} soon! 
              <a href="http://www.ticketmaster.com">Click here to buy tickets!</a>
          </Text>
        </div>
       )} 
        <div className='footer'>
      <Box bg={'white'} role="contentinfo" mx="auto" w={'100%'} h={8} >
    <Stack>
      
         <div className='footer-text'>
      Copyright 2021 Tassled Wobbegong
      </div>
    
      
    </Stack>
  </Box>
  </div>
    </Box>
  );
};

export default Search;
