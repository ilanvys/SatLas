import React, { useEffect } from "react";
import {
  LayerGroup
} from "react-leaflet"
import PropTypes from "prop-types";

import { useStateContext } from "./MapStateContext";

const propTypes = {
  name: PropTypes.string
}

const SatLasLayer = props => {
  const {
    name,
    children
  } = props;

  const [state, actions] = useStateContext();

  useEffect(() => {
    actions.addLayer(name);

    return () => {
      actions.removeLayer();
    }
  }, []);

  return (
    <LayerGroup {...props}>
      { React.Children.map(children, child =>
        React.cloneElement(child, { layerName: name })
      )}
    </LayerGroup>
  )
}

SatLasLayer.propTypes = propTypes;

export default SatLasLayer;
