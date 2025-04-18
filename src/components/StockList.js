import React, { useEffect, useRef, useState } from "react";
import "../styles/StockList.css";

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

const StockList = () => {
  const [symbols, setSymbols] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTickerData, setSelectedTickerData] = useState(null);
  const [showPopup, setShowPopup] = useState(false); 
  const containerRef = useRef(null);

  useEffect(() => {
    const randomTickers = DUMMY_TICKERS.sort(() => 0.5 - Math.random()).slice(0, 5);
    setSymbols(randomTickers);
  }, []);

  useEffect(() => {
    if (!symbols.length) return;

    const existingScript = document.querySelector(
      'script[src="https://s3.tradingview.com/external-embedding/embed-widget-tickers.js"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    if (containerRef.current) {
      containerRef.current.innerHTML = `
        <div class="tradingview-widget-container__widget"></div>
      `;
    }

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

  // useEffect(() => {
  //   if (showPopup) {
  //     // Automatically hide the popup after 5 seconds
  //     setTimeout(() => {
  //       setShowPopup(false);
  //     }, 5000);
  //   }
  // }, [showPopup]);

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
    // const others = DUMMY_TICKERS.filter((t) => t.proName !== item.proName);
    setSymbols([item]);
    setSearch(item.title);
    setSuggestions([]);
    const data = await getTickerData(item.title);
    setSelectedTickerData(data);
    setShowPopup(true);
  };
  const handleCommandClick = () => {
    setSymbols(DUMMY_TICKERS); 
    setShowPopup(true); 
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSymbols([]); 
    window.location.reload(); 
  };
  return (
    <div className="stock-container">
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

      {showPopup && (
        <div className="popup-widget animate-popup">
          <div className="popup-header">
            <button onClick={handleClosePopup} className="close-button">❌</button>
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
      )}
    </div>
  );
};

export default StockList;
