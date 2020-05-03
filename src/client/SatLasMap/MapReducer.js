import _ from "lodash";

const ADD_LAYER = "ADD_LAYER";
const REMOVE_LAYER = "ADD_LAYER";
const ADD_TO_LAYER = "ADD_TO_LAYER";
const REMOVE_FROM_LAYER = "REMOVE_FROM_LAYER";
const SET_LAYER_SHOW = "SET_LAYER_SHOW";

const initialLayer = {
  childrenCount: 0,
  show: true
};

const reducer = (currentState, action) => {
  const state = _.cloneDeep(currentState);
  const { layerName } = action;
  const layer = state.layers[layerName];

  switch (action.type) {
    case ADD_LAYER:
      if (!layer) {
        state.layers[layerName] = initialLayer;
      }
      return state;
    case REMOVE_LAYER:
      if (!layer) {
        throw new Error(`Given layer doesn't exist: '${layerName}'`);
      }
      delete state.layers[layerName];
      return state;
    case ADD_TO_LAYER:
      if (!!layer) {
        layer.childrenCount += 1;
        return state;
      }
      // In case the child was rendered first, the layer should be initialized
      state.layers[layerName] = initialLayer;
      state.layers[layerName].childrenCount = 1;
      return state;
    case REMOVE_FROM_LAYER:
      if (!layer) {
        throw new Error(`Given layer doesn't exist: '${layerName}'`);
      }
      layer.childrenCount -= 1;
      return state;
    case SET_LAYER_SHOW:
      if (!layer) {
        throw new Error(`Given layer doesn't exist: '${layerName}'`);
      }
      layer.show = action.show;
      return state;
    default:
      return state;
  }
}

const actions = dispatch => ({
  addLayer: layerName => {
    dispatch({
      type: ADD_LAYER,
      layerName
    });
  },
  removeLayer: layerName => {
    dispatch({
      type: REMOVE_LAYER,
      layerName
    });
  },
  addToLayer: layerName => {
    dispatch({
      type: ADD_TO_LAYER,
      layerName
    });
  },
  removeFromLayer: layerName => {
    dispatch({
      type: REMOVE_FROM_LAYER,
      layerName
    });
  },
  setLayerShow: (layerName, show) => {
    dispatch({
      type: SET_LAYER_SHOW,
      layerName,
      show
    });
  }
});

export {
  reducer,
  actions
}