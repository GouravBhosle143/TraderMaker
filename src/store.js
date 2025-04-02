import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./features/stockSlice";

const store = configureStore({
  reducer: {
    stocks: stockReducer,
  },
});

export default store;
