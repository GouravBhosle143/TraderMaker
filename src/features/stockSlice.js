import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStockTickers } from "../services/stockService";

export const getStockTickers = createAsyncThunk("stocks/getStockTickers", fetchStockTickers);

const stockSlice = createSlice({
  name: "stocks",
  initialState: {
    tickers: [
      { symbol: "FOREXCOM:SPXUSD", name: "S&P 500 Index" },
      { symbol: "FOREXCOM:NSXUSD", name: "US 100 Cash CFD" },
      { symbol: "FX_IDC:EURUSD", name: "EUR to USD" },
      { symbol: "BITSTAMP:BTCUSD", name: "Bitcoin" },
      { symbol: "BITSTAMP:ETHUSD", name: "Ethereum" },
    ],
    loading: false,
  },
  reducers: {},
});


export default stockSlice.reducer;
