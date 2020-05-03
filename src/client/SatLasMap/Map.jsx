import React from "react";
import PropTypes from "prop-types";
import {
  Map,
  TileLayer,
  LayersControl,
} from "react-leaflet";

import { StateProvider } from "./MapStateContext";
import SideBar from "./SideBar";
import MarkersList from "./MarkersList";

import "leaflet/dist/leaflet.css";

const propTypes = {
  responsive: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};

const defaultProps = {
  responsive: false
};

class SatLasMap extends React.Component {
  constructor(props) {
    super(props);

    const {
      width,
      height
    } = props;

    this.state = {
      lat: 50,
      lng: 0,
      zoom: 2,
      width,
      height,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      markers: []
    }

    this.addMarker = this.addMarker.bind(this)
    this.removeMarkers = this.removeMarkers.bind(this)
  }
  
  componentDidMount() {
    if (this.props.responsive) {
      window.addEventListener("resize", this.handleResize);
    }
  }
  
  componentWillUnmount() {
    if (this.props.responsive) {
      window.removeEventListener("resize", this.handleResize);
    }
  }
  
  handleResize = () => {
    const { width, height } = this.state;
    if (!width || !height) {
      return console.warn("[Warning] Width and height props need to be set in order to use 'responsive' map");
    }
    
    this.setState({
      width: window.innerWidth / (this.state.screenWidth / width),
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    })
  }

  addMarker = (coordinates) => {
    this.setState(state => { 
      const list = state.markers.concat(coordinates)
      return {
        markers: list
      }
    })
  }
  
  removeMarkers = (coordinates) => {
    this.setState(state => { 
      return {
        markers: []
      }
    })
  }
  
  render() {
    const { width, height, lat, lng, zoom, markers } = this.state;
    const { className, style } = this.props;
    const currentStyle = !!width && !!height ? { ...style, width, height } : style;
    return(
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
          handleRemoveMarkers={this.removeMarkers}
        /> 
        <StateProvider>
          <SideBar 
            handleAddMarker={this.addMarker}  
          />
          <LayersControl 
            position="topright" 
            collapsed={false}
          >
            <LayersControl.Overlay name="group1">
              {this.props.children}
            </LayersControl.Overlay>
          </LayersControl>
        </StateProvider>
      </Map>
    )
  }
}


SatLasMap.propTypes = propTypes;
SatLasMap.defaultProps = defaultProps;

export default SatLasMap;