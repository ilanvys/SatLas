import _ from "lodash";
import React, { createContext, useReducer } from "react";

import { actions, reducer } from "./Reducers/MapReducer";

const initialState = {
  layers: {},
  markers: [{
    longitude: 25,
    latitude: 25,
    id: 1
  }] //Just as an example
}

export const StateContext = createContext([initialState, actions(_.noop)]);

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={[state, actions(dispatch)]}>
      {children}
    </StateContext.Provider>
  )
}
