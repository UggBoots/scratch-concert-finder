import React, { useState, useEffect } from "react";
import mapbox from "mapbox-gl";

const Map = () => {
  const [longitude, setLongitude] = useState("-74.0060");
  const [latitude, setLatitude] = useState("40.7128");
  const [zoom, setZoom] = useState("13");
  const [style, setStyle] = useState("mapbox://styles/mapbox/satellite-v9");

  useEffect(() => {
    mapbox.accessToken =
      "pk.eyJ1IjoiaWtqdWRkIiwiYSI6ImNrcWppMTM2ZTA5ODQybm9ieTE5M2J0YTAifQ._eHutyLjit-nTSOpnD-Vmg";

    const map = new mapbox.Map({
      container: "map",
      style: style,
      center: [longitude, latitude],
      zoom: zoom,
    });
    map.addControl(new mapbox.NavigationControl());
  }, []);

  return (
    <div
      id="map"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
      }}
    >
      <img src="client/images/b7d0b611d3d927b74c6b71f5e797a5fe.jpeg" />
    </div>
  );
};

export default Map;
