import axios from "axios";
import { productsRequest, productsSuccess, productsFailure } from "../slices/ProductSlice";

export const getProducts = async (dispatch) => {
  try {
    dispatch(productsRequest());
    const { data } = await axios.get("http://localhost:8000/api/v1/products");
    dispatch(productsSuccess(data));
  } catch (error) {
    dispatch(productsFailure(error.response.data.message || "Failed to fetch products"));
    console.error("Error fetching products:", error);
  }
};
