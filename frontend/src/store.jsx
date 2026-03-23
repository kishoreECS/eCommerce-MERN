import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import productsReducer from "./slices/ProductSlice";

// Example reducer
const reducer = combineReducers({
  productState: productsReducer,
});

const store = configureStore({
  reducer: reducer,
});

export default store;
