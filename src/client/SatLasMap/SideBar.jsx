import React from "react";

import Control from 'react-leaflet-control'

import { useStateContext } from "./MapStateContext";

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markerCoordinates: {
        first: "",
        second: ""
      }
    }

  }

  handleTextChange = (coordinate, value) => {
    this.setState({markerCoordinates: {
      ...this.state.markerCoordinates,
      [coordinate]: value
    }})
  }

  render() {
    return (
      <Control position="topleft" >
        <div id="side-bar">
          <input type="text" onChange={(e) => this.handleTextChange('first', e.target.value)}/>
          <input type="text" onChange={(e) => this.handleTextChange('second', e.target.value)}/>
          <button onClick={() => this.props.handleAddMarker({
            first: parseFloat(this.state.markerCoordinates.first), 
            second: parseFloat(this.state.markerCoordinates.second)
          })}>
            Add Marker
          </button>
        </div>
      </Control>
    )
  }
}

export default SideBar;
