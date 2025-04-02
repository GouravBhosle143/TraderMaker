import React, { useState, useEffect } from "react";
import TradingViewChart from "./TradingViewChart";
import FundamentalData from "./Fudamentaldata";
import { SymbolProvider } from "../context/SymbolContext";

const MainPanel = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const dummyData = [
      { time: 1640995200, open: 50, high: 55, low: 48, close: 52 },
      { time: 1641081600, open: 52, high: 58, low: 50, close: 57 },
      { time: 1641168000, open: 57, high: 60, low: 55, close: 58 },
      { time: 1641254400, open: 58, high: 63, low: 56, close: 62 },
      { time: 1641340800, open: 62, high: 65, low: 59, close: 60 },
    ];

    setStockData(dummyData);
  }, []);
  return (
    <SymbolProvider>
      <div className="panel main-panel">
        <h2 className="ticker-list">Stock Price Chart</h2>
        <TradingViewChart data={stockData} />
        <br />
        <FundamentalData />
      </div>
    </SymbolProvider>
  );
};

export default MainPanel;
