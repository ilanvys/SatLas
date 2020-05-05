import _ from "lodash";

export const initalMarkerList = [{
  longitude: '11',
  latitude: '11',
  id: 1
}]

const markerReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MARKER':
        return [...state, {
          longitude: action.payload.longitude,
          latitude: action.payload.latitude,
          id: state.length + 1
        }]
    case 'REMOVE_MARKER':
      const id = action.payload.latitude
      let newMarkersArray = [] 
      for (let index = 0; index < state.length; index++) {
        if (state[index].id != id) {
          newMarkersArray.push(state[index])
        }
      }
      return [newMarkersArray]
    default:
      return state;
  }
}

const markerActions = dispatch => ({
  addMarker: (longitude, latitude) => {
    dispatch({
      type: 'ADD_MARKER',
      payload: {
        longitude,
        latitude
      }
    });
  },
  removeMarker: (longitude, latitude) => {
    dispatch({
      type: 'REMOVE_MARKER',
      payload: {
        longitude,
        latitude
      }
    });
  },
})

export {
  markerReducer,
  markerActions,
}
