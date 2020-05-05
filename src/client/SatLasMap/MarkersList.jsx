import React, { useEffect, useContext } from 'react';
import {
  Marker,
  Popup
} from 'react-leaflet'
import L from 'leaflet'
import { StateContext } from "./MapStateContext";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const MarkersList = () => {
  const [state, actions] = useContext(StateContext)

  useEffect(() => {
  },[state.markers])

  return (<div>
    {state.markers.map(marker => {
      return <Marker                 
        key={marker.id}
        position={[marker.longitude, marker.latitude]} 
        name={`[${marker.longitude}, ${marker.latitude}]`}>
        <Popup>
          <div onClick={() => actions.removeMarker(marker.id)}>Click To Remove</div>
        </Popup>
      </Marker>
    })}
  </div>)
}

export default MarkersList
