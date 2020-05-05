import React, { useEffect, useContext } from "react";
import {
  LayerGroup
} from "react-leaflet"
import PropTypes from "prop-types";

import { StateContext } from "./MapStateContext";

const propTypes = {
  name: PropTypes.string,
  show: PropTypes.bool
}

const defaultProps = {
  show: true
}

const SatLasLayer = props => {
  const {
    name,
    children,
    show
  } = props;

  const [state, actions] = useContext(StateContext)

  const layerData = !!state.layers[name] ?
    state.layers[name]
    : { show };

  useEffect(() => {
    actions.addLayer(name, layerData);

    return () => {
      actions.removeLayer();
    }
  }, []);

  return (
    layerData.show ?
    <LayerGroup {...props}>
      { React.Children.map(children, child =>
        React.cloneElement(child, { layerName: name })
      )}
    </LayerGroup>
    : ""
  )
}

SatLasLayer.propTypes = propTypes;
SatLasLayer.defaultProps = defaultProps;

export default SatLasLayer;
