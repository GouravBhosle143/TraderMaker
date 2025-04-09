import React, { useState } from "react";
import { getTickerData, getDates } from "../api/fakeApi";

const TickerInfo = () => {
  const [data, setData] = useState(null);
  const [highlighted, setHighlighted] = useState([]);

  const handleClick = async () => {
    const stock = await getTickerData("NASDAQ:AAPL");
    setData(stock);

    const lines = await getDates(1, "NASDAQ:AAPL", "any");
    setHighlighted(lines.highlightedDates);
  };

  return (
    <div style={{ color: "#fff" }}>
      <button onClick={handleClick}>Fetch Ticker + Highlight Dates</button>

      {data && (
        <div>
          <h3>{data.name}</h3>
          <ul>
            {data.prices.map((item, idx) => (
              <li key={idx}>
                {item.date} — {item.value}
                {highlighted.includes(item.date) && " 🔻"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TickerInfo;
