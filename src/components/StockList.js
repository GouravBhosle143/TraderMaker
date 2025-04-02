import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStockTickers } from "../features/stockSlice";

const StockList = () => {
  const dispatch = useDispatch();
  const { tickers, loading } = useSelector((state) => state.stocks);

  useEffect(() => {
    dispatch(getStockTickers());
  }, [dispatch]);

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://s3.tradingview.com/external-embedding/embed-widget-tickers.js"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
        { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
      ],
      isTransparent: false,
      showSymbolLogo: true,
      colorTheme: "dark",
      locale: "en",
    });

    const widgetContainer = document.getElementById("tradingview-widget");
    if (widgetContainer) {
      widgetContainer.appendChild(script);
    }
  }, []);

  return (
    <div>
      <h2 className="ticker-list">Stock Ticker List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="tradingview-widget-container">
          <div id="tradingview-widget"></div>
        </div>
      )}
    </div>
  );
};

export default StockList;
