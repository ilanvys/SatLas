import _ from "lodash";

import { layersReducer, layersActions, layersReducerActionsList } from './layersReducer'
import { markersReducer, markersActions, markersReducerActionsList } from './markersReducer'

const reducer = (state, action) => {
  console.log("hello")
  if (layersReducerActionsList.includes(action.type)) {
    return layersReducer(state, action)
  }
  if (markersReducerActionsList.includes(action.type)) {
    return markersReducer(state, action)
  }
  return state
}

const actions = dispatch => ({
  addLayer: layerName => {
    dispatch({
      type: 'ADD_LAYER',
      payload: {
        layerName
      }
    });
  },
  removeLayer: layerName => {
    dispatch({
      type: 'REMOVE_LAYER',
      payload: {
        layerName
      }
    });
  },
  addToLayer: layerName => {
    dispatch({
      type: 'ADD_TO_LAYER',
      payload: {
        layerName
      }
    });
  },
  removeFromLayer: layerName => {
    dispatch({
      type: 'REMOVE_FROM_LAYER',
      payload: {
        layerName
      }
    });
  },
  setLayerShow: (layerName, show) => {
    dispatch({
      type: 'SWITCH_LAYER_SHOW',
      payload: {
        layerName,
        show
      }
    });
  },
  addMarker: (longitude, latitude) => {
    dispatch({
      type: 'ADD_MARKER',
      payload: {
        longitude,
        latitude
      }
    });
  },
  removeMarker: (id) => {
    dispatch({
      type: 'REMOVE_MARKER',
      payload: {
        id
      }
    });
  }
})

export {
  reducer,
  actions
}
