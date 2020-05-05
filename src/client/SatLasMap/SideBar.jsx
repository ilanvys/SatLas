import React, {useReducer, useState} from "react";

import Control from 'react-leaflet-control'

import { 
  initalMarkerList, 
  markerReducer, 
  markerActions,
  MarkersContext
 } from './Reducers/MarkersReducer'

const SideBar = () => {
  const [markerCoordinates, setCoordinates] = useState({
    longitude: '',
    latitude: ''
  })

  const [markers, dispach] = useReducer(markerReducer, initalMarkerList)
  
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
          dispach({
          type: 'ADD_MARKER',
          payload: {
            longitude: markerCoordinates.longitude,
            latitude: markerCoordinates.latitude
          }})
        }}>
        Add Marker
      </button>
    </div>
  </Control>)
}
 
export default SideBar;
