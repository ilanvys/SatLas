import _ from "lodash";
import React, { createContext, useContext, useReducer } from "react";

import { actions, reducer } from "./MapReducer";

const initialState = {
  layers: {}
};

const StateContext = createContext([initialState, actions(_.noop)]);

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={[state, actions(dispatch)]}>
      {children}
    </StateContext.Provider>
  )
};

const useStateContext = () => useContext(StateContext);

export {
  StateContext,
  StateProvider,
  useStateContext
}
