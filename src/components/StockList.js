import React, { useEffect, useRef, useState } from "react";
import '../styles/StockList.css';

// Simulated ticker data fetch
export const getTickerData = async (tickerName) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    name: tickerName,
    prices: [
      { date: "2024-04-01", value: 100 },
      { date: "2024-04-02", value: 105 },
      { date: "2024-04-03", value: 103 },
      { date: "2024-04-04", value: 108 },
      { date: "2024-04-05", value: 102 },
    ],
  };
};

// Simulated highlighted dates fetch
export const getDates = async (query, param1, param2) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    highlightedDates: ["2024-04-02", "2024-04-04"],
  };
};

const DUMMY_TICKERS = [
  { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
  { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
  { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
  { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
  { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
  { proName: "NASDAQ:AAPL", title: "Apple" },
  { proName: "NASDAQ:GOOGL", title: "Google" },
  { proName: "NASDAQ:MSFT", title: "Microsoft" },
];

const DUMMY_DATES = ["2023-12-01", "2023-12-15", "2023-12-20"];

const StockList = () => {
  const [symbols, setSymbols] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTickerData, setSelectedTickerData] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const randomTickers = DUMMY_TICKERS.sort(() => 0.5 - Math.random()).slice(0, 5);
    setSymbols(randomTickers);
  }, []);

  useEffect(() => {
    if (!symbols.length) return;

    // Clear existing script
    const existingScript = document.querySelector(
      'script[src="https://s3.tradingview.com/external-embedding/embed-widget-tickers.js"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Clear old children
    if (containerRef.current) {
      containerRef.current.innerHTML = `
        <div class="tradingview-widget-container__widget"></div>
      `;
    }

    // Inject new script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";
    script.async = true;
    script.type = "text/javascript";
    script.text = JSON.stringify({
      symbols: symbols,
      isTransparent: false,
      showSymbolLogo: true,
      colorTheme: "dark",
      locale: "en",
    });

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }
  }, [symbols]);


  const handleSearch = (text) => {
    setSearch(text);
    const filtered = DUMMY_TICKERS.filter(
      (item) =>
        item.title.toLowerCase().includes(text.toLowerCase()) ||
        item.proName.toLowerCase().includes(text.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSelect = async (item) => {
    const others = DUMMY_TICKERS.filter((t) => t.proName !== item.proName).slice(0, 2);
    setSymbols([item, ...others]);
    setSearch(item.title);
    setSuggestions([]);
    const data = await getTickerData(item.title); // or use item.proName
    setSelectedTickerData(data);
  };

  const handleCommandClick = () => {
    setSymbols(DUMMY_TICKERS); // Show all tickers
  };


  return (
    <div className="stock-container">
      <h2 className="stock-heading">📈 Stock Ticker Dashboard</h2>

      <div className="stock-search-container-1">
        <div className="stock-search-wrapper">
          <input
            type="text"
            placeholder="Search ticker name..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="stock-search-input"
          />
          {suggestions.length > 0 && (
            <ul className="stock-suggestions">
              {suggestions.map((item, index) => (
                <li key={index} onClick={() => handleSelect(item)} className="stock-suggestion-item">
                  {item.title} ({item.proName})
                </li>
              ))}
            </ul>
          )}
        </div>

        <button onClick={handleCommandClick} className="stock-command-button">
          Show All Tickers
        </button>
      </div>

      <div className="tradingview-widget-container" ref={containerRef}>
        <div className="tradingview-widget-container__widget" />
      </div>

      {selectedTickerData && (
        <div className="stock-data">
          <h3>{selectedTickerData.name} - Price Data</h3>
          <ul>
            {selectedTickerData.prices.map((price, idx) => (
              <li key={idx}>
                {price.date}: <span className="price-value">${price.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  // );
};

export default StockList;
