import React, { useEffect } from "react";
import {
  Circle
} from "react-leaflet"

import { useStateContext } from "./MapStateContext";

const SatLasPolygon = props => {
  const {
    layerName
  } = props;

  const isInLayer = !!layerName;

  const [state, actions] = useStateContext();

  useEffect(() => {
    if (isInLayer) {
      actions.addToLayer(layerName);

      return () => {
        actions.removeFromLayer(layerName);
      }
    }
  }, []);

  return (
    <Circle onClick={() => actions.setLayerShow(layerName, false)} {...props}/>
  )
}

export default SatLasPolygon;
