import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

// Example reducer
const rootReducer = combineReducers({
  // add reducers here
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
