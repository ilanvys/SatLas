import React, { useEffect } from "react";
import {
  Circle
} from "react-leaflet"

import { useStateContext } from "./MapStateContext";

const SatLasPolygon = props => {
  const {
    layerName
  } = props;

  const [state, actions] = useStateContext();

  useEffect(() => {
    actions.addToLayer(layerName);

    return () => {
      actions.removeFromLayer(layerName);
    }
  }, []);

  return (
    <Circle {...props}/>
  )
}

export default SatLasPolygon;
