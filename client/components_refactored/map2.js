import 'mapbox-gl/dist/mapbox-gl.css';
// import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import './map2styles.css';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  TextField,
  Card,
  CardActionArea,
  CardContent,
} from '@material-ui/core';
import MapGL, { Marker, Popup } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import axios from 'axios';
import getConcertsFromPredictHQ from '../api/getConcertsFromPredictHQ';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(1),
    left: "345px",
    top: '10px',
    width: 200,
  }
}));

// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN =
  'pk.eyJ1IjoicHRyaTN1Z2dib290cyIsImEiOiJja3F1MTJxOXYwMDJrMndwbTUzN2Job3dqIn0._pOvjJBfdKTbopkvRX0Bhg';

const Map2 = (props) => {

  const classes = useStyles();

  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 10,
  });


  const [selectedConcert, setSelectedConcert] = useState(null);

  const getConcerts = async (lat, long) => {
    // const latLong = `${lat},${long}`;
    // data = year/month/day
    const predictHQResults = await getConcertsFromPredictHQ({
      lat: lat,
      lng: long,
      date: '2021/07/17',
      radius: 50,
    });
    console.log(predictHQResults);
    setConcerts(predictHQResults.results);
  };

  const getCurrentLocation = (position) => {
    setViewport({
      ...viewport,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  const locationUnavaliable = () => {
    setViewport({ ...viewport, latitude: '40.7128', longitude: '-74.0060' });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      getCurrentLocation,
      locationUnavaliable,
      { enableHighAccuracy: true }
    );
  }, []);

  const geocoderContainerRef = useRef();
  const mapRef = useRef();

  const handleResult = (e) => {
    const latitude = e.result.center[1];
    const longitude = e.result.center[0];
    props.getConcerts(latitude, longitude); 
  };

  const handleViewportChange = useCallback((newViewport) => {
    return setViewport(newViewport);
  });

  let today = new Date().toISOString().slice(0, 10)

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 50,
          width: '100%',
          zIndex: 1,
          margin: 'auto',
        }}
      >
        <div
          style={{
            width: '60%',
            margin: 'auto',
          }}
          ref={geocoderContainerRef}
        />
        <div>
          <TextField
           id="date"
           label="date"
           type="date"
           defaultValue={today}
           className={classes.textField}
           InputLabelProps={{
             shrink: true,
           }} />
        </div>
      </div>

      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Geocoder
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          onResult={handleResult}
          onViewportChange={handleViewportChange}
          marker={false}
          zoom={10}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          placeholder="Search for an area..."
          inputValue=""
          // collapsed={true}
        />
        {props.concerts.map((concert) => (
          <Marker
            key={concert.id}
            latitude={concert.location[1]}
            longitude={concert.location[0]}
          >
            <button
              style={{ border: 'none', background: 'none', cursor: 'pointer' }}
              onClick={(e) => {
                e.preventDefault();
                setSelectedConcert(concert);
              }}
            >
              <img
                src={require('../images/music-concert-hall-comments-concert-icon-11563061580gvxq0uuf6r.png')}
                alt="Concert Icon"
                style={{ width: '40px', height: '40px' }}
              />
            </button>
          </Marker>
        ))}

        {selectedConcert ? (
          <Popup
            latitude={selectedConcert.location[1]}
            longitude={selectedConcert.location[0]}
            onClose={() => {
              setSelectedConcert(null);
            }}
          >
            <div>
              <h4>{selectedConcert.title}</h4>
              <h5>{selectedConcert.entities[0].name}</h5>
              <h6>{selectedConcert.entities[0].formatted_address}</h6>
              <p>{selectedConcert.description}</p>
            </div>
          </Popup>
        ) : null}
      </MapGL>
    </div>
  );
};

export default Map2;
