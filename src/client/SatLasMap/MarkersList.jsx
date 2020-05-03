import React, { useEffect } from "react";
import {
  Marker,
  Popup
} from "react-leaflet"
import L from "leaflet"

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const MarkersList = props => {
  return (
    props.markers.map(marker => {
      return <Marker                 
        key={marker.first}
        position={[marker.first, marker.second]} 
        name="hi">
        <Popup>
          <div onClick={() => props.handleRemoveMarkers()}>Click To Remove</div>
        </Popup>
      </Marker>
    })
  )
}

export default MarkersList;
