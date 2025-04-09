import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Replace this with your actual backend API base URL
const BASE_URL = "http://localhost:5000/api";

// Fetch list of stock tickers
export const getStockTickers = createAsyncThunk(
  "stocks/getStockTickers",
  async () => {
    const response = await axios.get(`${BASE_URL}/tickers`);
    return response.data;
  }
);

// Fetch ticker data for a specific symbol
export const getTickerData = createAsyncThunk(
  "stocks/getTickerData",
  async (tickerSymbol) => {
    const response = await axios.get(`${BASE_URL}/ticker/${tickerSymbol}`);
    return response.data;
  }
);

const stockSlice = createSlice({
  name: "stocks",
  initialState: {
    tickers: [],
    selectedTickerData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get All Tickers
      .addCase(getStockTickers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStockTickers.fulfilled, (state, action) => {
        state.loading = false;
        state.tickers = action.payload;
      })
      .addCase(getStockTickers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Get Ticker Data
      .addCase(getTickerData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTickerData.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTickerData = action.payload;
      })
      .addCase(getTickerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default stockSlice.reducer;
