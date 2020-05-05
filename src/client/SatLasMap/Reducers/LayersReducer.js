import _ from "lodash";

const initialLayer = {
  childrenCount: 0,
  show: true
}

const layersReducer = (state, action) => {
  const layerName = action.payload.layerName
  const layerExist = state.layers[layerName]

  switch (action.type) {
    case 'ADD_LAYER':
        return {
          ...state,
          [layerName]: initialLayer
        }
    case 'REMOVE_LAYER':
      let layers = _.cloneDeep(state.layers)
      delete layers[layerName]
      return {
        ...state,
        layers
      }
    case 'ADD_TO_LAYER':
      if (!!layerExist) {
        return {
          ...state,
          layers: {
            ...state.layers,
            [layerName]: {
              ...state.layers[layerName],
              childrenCount:  state.layers[layerName].childrenCount + 1
            }
          }
        }
      }
      // In case the child was rendered first, the layer should be initialized
      let newLayer = _.cloneDeep(initialLayer)
      newLayer.childrenCount = 1
      return {
        ...state,
        [layerName]: newLayer
      }
    case 'REMOVE_FROM_LAYER':
      return {
        ...state,
        layers: {
          ...state.layers,
          [layerName]: {
            ...state.layers[layerName],
            childrenCount:  state.layers[layerName].childrenCount - 1
          }
        }
      }
    case 'SWITCH_LAYER_SHOW':
      return {
        ...state,
        layers: {
          ...state.layers,
          [layerName]: {
            ...state.layers[layerName],
            show: !state.layers[layerName].show
          }
        }
      }
    default:
      return state;
  }
}

const layersActions = dispatch => ({
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
  }
});

export const layersReducerActionsList = ['ADD_LAYER', 'REMOVE_LAYER', 'ADD_TO_LAYER', 'REMOVE_FROM_LAYER', 'SWITCH_LAYER_SHOW']


export {
  layersReducer,
  layersActions
}
