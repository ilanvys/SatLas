import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Map,
  TileLayer,
  LayersControl,
} from "react-leaflet";

import SideBar from "./SideBar";
import MarkersList from "./MarkersList";

import "leaflet/dist/leaflet.css";

const addMarker = setState => coordinates => {
  setState(state => ({
    ...state,
    markers: state.markers.concat(coordinates)
  }));
}

const removeMarkers = setState => coordinates => {
  setState(state => ({
    ...state,
    markers: []
  }));
}

const handleResize = setState => () => {
  setState(state => {
    const { width, height, screenWidth } = state;
    if (!width || !height) {
      return console.warn("[Warning] Width and height props need to be set in order to use 'responsive' map");
    }

    return {
      ...state,
      width: window.innerWidth / (screenWidth / width),
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    }
  });
}


const propTypes = {
  responsive: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};

const defaultProps = {
  responsive: false
};

const SatLasMap = props => {
  const {
    responsive,
    className,
    style,
    children
  } = props;

  const [state, setState] = useState({
    lat: 50,
    lng: 0,
    zoom: 2,
    width: props.width,
    height: props.height,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    markers: []
  });

  useEffect(() => {
    if (responsive) {
      window.addEventListener("resize", handleResize(setState));
    }

    return () => {
      if (responsive) {
        window.removeEventListener("resize", handleResize(setState));
      }
    }
  }, [])


  const { width, height, lat, lng, zoom, markers } = state;
  const currentStyle = !!width && !!height ? { ...style, width, height } : style;

  return (
    <Map
      style={currentStyle}
      className={className}
      center={[lat, lng]}
      zoom={zoom}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkersList
        markers={markers}
        handleRemoveMarkers={removeMarkers(setState)}
      />
      <SideBar
        handleAddMarker={addMarker(setState)}
      />
      <LayersControl
        position="topright"
        collapsed={false}
      >
        <LayersControl.Overlay name="group1">
          {children}
        </LayersControl.Overlay>
      </LayersControl>
    </Map>
  )
}

SatLasMap.propTypes = propTypes;
SatLasMap.defaultProps = defaultProps;

export default SatLasMap;