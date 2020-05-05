import React, { useState, useContext } from "react";

import Control from 'react-leaflet-control'
import { StateContext } from "./MapStateContext";


const SideBar = () => {
  const [markerCoordinates, setCoordinates] = useState({
    longitude: '',
    latitude: ''
  })

  const [state, actions] = useContext(StateContext)

  return (<Control position="topleft" >
    <div id="side-bar">
    <input type='text' 
        value={markerCoordinates.longitude}
        onChange={e => setCoordinates({
            ...markerCoordinates,
            longitude: e.target.value
        })}
      />
      <input type='text' 
        value={markerCoordinates.latitude}
        onChange={e => setCoordinates({
            ...markerCoordinates,
            latitude: e.target.value
        })}
      />
        <button onClick={() => {
          actions.addMarker(
            parseFloat(markerCoordinates.longitude), 
            parseFloat(markerCoordinates.latitude))
        }}>
        Add Marker
      </button>
    </div>
  </Control>)
}
 
export default SideBar;
