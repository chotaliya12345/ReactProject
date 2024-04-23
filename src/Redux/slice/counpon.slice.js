import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/baseURL";
import axios from "axios";

const initialState = {
  isLoading: false,
  coupon: [],
  error: null,
};

export const getCoupon = createAsyncThunk("coupon/getCoupon", async () => {
  try {
    const response = await axios.get(BASE_URL + "coupon");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addCoupon = createAsyncThunk(
  "coupon/addCoupon",
  async (couponData) => {
    try {
      const response = await axios.post(BASE_URL + "coupon", couponData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteCoupon = createAsyncThunk("coupon/delete", async (id) => {
  try {
    await axios.delete(BASE_URL + "coupon/" + id);
    return id;
  } catch (error) {
    throw error;
  }
});

export const editCoupon = createAsyncThunk("coupon/edit", async (data) => {
  try {
    const response = await axios.put(BASE_URL + "coupon/" + data.id, data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupon = state.coupon.concat(action.payload);
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupon = action.payload;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.coupon = state.coupon.filter((v) => v.id !== action.payload);
      })
      .addCase(editCoupon.fulfilled, (state, action) => {
        state.coupon = state.coupon.map((v) => {
          if (v.id === action.payload.id) {
            return action.payload;
          } else {
            return v;
          }
        });
      });
  },
});

export default couponSlice.reducer;
