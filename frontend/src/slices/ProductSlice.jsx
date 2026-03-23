import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  reducers: {
    productsRequest: (state) => {
      state.loading = true;
    },

    productsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    },

    productsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { actions, reducer } = productsSlice;

export const { productsRequest, productsSuccess, productsFailure } = actions;

export default reducer;
