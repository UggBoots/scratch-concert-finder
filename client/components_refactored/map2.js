// import React, { useState, useEffect, useRef, useCallback } from "react";
// import ReactMapGL, { Marker } from "react-map-gl";

// const map2 = () => {
//   const [viewport, setViewport] = useState({
//     width: "100vw",
//     height: "100vh",
//     zoom: 11,
//   });

//   const MAPBOX_TOKEN =
//     "pk.eyJ1IjoicHRyaTN1Z2dib290cyIsImEiOiJja3F1MTJxOXYwMDJrMndwbTUzN2Job3dqIn0._pOvjJBfdKTbopkvRX0Bhg";

//   const getCurrentLocation = (position) => {
//     setViewport({
//       ...viewport,
//       latitude: position.coords.latitude,
//       longitude: position.coords.longitude,
//     });
//   };

//   const locationUnavaliable = () => {
//     setViewport({ ...viewport, latitude: "40.7128", longitude: "-74.0060" });
//   };

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       getCurrentLocation,
//       locationUnavaliable,
//       { enableHighAccuracy: true }
//     );
//   }, []);

//   const handleViewportChange = useCallback(
//     (newViewport) => setViewport(newViewport),
//     []
//   );

//   return (
//     <ReactMapGL
//       {...viewport}
//       mapboxApiAccessToken={MAPBOX_TOKEN}
//       mapStyle="mapbox://styles/ptri3uggboots/ckqyndng9cjfm18lguhaxfx6x"
//       onViewportChange={handleViewportChange}
//     ></ReactMapGL>
//   );
// };

// export default map2;

// import "mapbox-gl/dist/mapbox-gl.css";
// import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback } from "react";
import { TextField } from "@material-ui/core";
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN =
  "pk.eyJ1IjoicHRyaTN1Z2dib290cyIsImEiOiJja3F1MTJxOXYwMDJrMndwbTUzN2Job3dqIn0._pOvjJBfdKTbopkvRX0Bhg";

const Example = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const geocoderContainerRef = useRef();
  const mapRef = useRef();
  const handleViewportChange = useCallback((newViewport) => {
    console.log("latitude: ", viewport.latitude);
    console.log("longitude: ", viewport.longitude);
    console.log("mapRef: ", mapRef);
    return setViewport(newViewport);
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <div
        ref={geocoderContainerRef}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 1,
        }}
      />
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
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
          value="test"
        />
      </MapGL>
    </div>
  );
};

export default Example;
