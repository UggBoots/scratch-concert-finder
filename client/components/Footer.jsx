import React from 'react';
import {
  Box,
  Stack,
} from '@chakra-ui/react';

const Footer = () => (
  <div className="footer">
    <Box bg={'white'} role="contentinfo" mx="auto" w={'100%'} h={8}>
      <Stack>
        <div className="footer-text">Copyright 2021 Tassled Wobbegong</div>
      </Stack>
    </Box>
  </div>
);

export default Footer;
