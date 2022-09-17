import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  CLEAR_ERROR,
} from "../constants/prodReducerConstants";

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    const data = await axios
      .get("/api/v1/products")
      .catch((ex) => console.log(ex));
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({ type: ALL_PRODUCT_FAIL, payload: error.message });
  }
};

export const clearError = (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
