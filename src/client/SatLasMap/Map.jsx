import React from "react";
import PropTypes from "prop-types";
import {
  Map,
  TileLayer,
} from "react-leaflet";

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
      screenHeight: window.innerHeight
    }
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

  render() {
    const { width, height, lat, lng, zoom } = this.state;
    const { className, style } = this.props;
    const currentStyle = !!width && !!height ? { ...style, width, height } : style;

    return(
      <Map
        style={currentStyle}
        className={className}
        center={[lat, lng]}
        zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
    )
  }
}

SatLasMap.propTypes = propTypes;
SatLasMap.defaultProps = defaultProps;

export default SatLasMap;