import { combineReducers } from "redux";
import { facilitiesReducer } from "../reducer/facilities.reducer";
import { productReducer } from "../reducer/product.reducer";
import { reviewReducer } from "../reducer/review.reducer";
import counterSlice from "../slice/counter.slice";
import cartSlice from "../slice/cart.slice";

export const rootReducer = combineReducers({
  facilities: facilitiesReducer,
  product: productReducer,
  review: reviewReducer,
  cart: cartSlice,
  counter: counterSlice,
});
