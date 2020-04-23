const ADD_LAYER = "ADD_LAYER";
const REMOVE_LAYER = "ADD_LAYER";
const ADD_TO_LAYER = "ADD_TO_LAYER";
const REMOVE_FROM_LAYER = "REMOVE_FROM_LAYER";

const reducer = (state, action) => {
  switch(action.type) {
    case ADD_LAYER:
      if (!state.layers[action.layerName]) {
        state.layers[action.layerName] = 0;
      }
      return state;
    case REMOVE_LAYER:
      delete state.layers[action.layerName];
      return state;
    case ADD_TO_LAYER:
      if (!!state.layers[action.layerName]) {
        state.layers[action.layerName] += 1;
      } else {
        state.layers[action.layerName] = 1;
      }
      return state;
    case REMOVE_FROM_LAYER:
      if (!!state.layers[action.layerName] || state.layers[action.layerName] === 0) {
        state.layers[action.layerName]-= 1;
      } else {
        throw new Error(`Given layer doesn't exist: '${action.layerName}'`);
      }
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
  }
});

export {
  reducer,
  actions
}