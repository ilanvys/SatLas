import _ from "lodash";
import React, { useEffect } from "react";
import {
  Circle
} from "react-leaflet";
import PropTypes from "prop-types";

import { useStateContext } from "./MapStateContext";

const propTypes = {
  layerName: PropTypes.string,
  zoomOnClick: PropTypes.bool,
  onClick: PropTypes.func
};

const defaultProps = {
  zoomOnClick: false,
  onClick: _.noop
};

const SatLasPolygon = props => {
  const {
    layerName,
    zoomOnClick,
    onClick
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

  const _onClick = () => {
    if (zoomOnClick) {
      actions.setCenterZoom();
    }
    onClick();
  }

  return (
    <Circle {...props} onClick={_onClick}/>
  )
}

SatLasPolygon.propTypes = propTypes;
SatLasPolygon.defaultProps = defaultProps;

export default SatLasPolygon;
