import _ from "lodash";
import React, { createContext, useReducer } from "react";

import { actions, reducer } from "./Reducers/MapReducer";

const initialState = {
  layers: {},
  markers: []
};

export const StateContext = createContext([initialState, actions(_.noop)]);

const  StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={[state, actions(dispatch)]}>
      {children}
    </StateContext.Provider>
  )
}
