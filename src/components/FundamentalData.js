import React, { useEffect, useContext, useRef } from "react";
import { SymbolContext } from "../context/SymbolContext";
import { Collapse } from "antd";

const { Panel } = Collapse;

const FundamentalData = () => {
  const { symbol } = useContext(SymbolContext);
  const widgetContainerRef = useRef(null);

  useEffect(() => {
    const selectedSymbol = symbol || "NASDAQ:AAPL";

    if (widgetContainerRef.current) {
      widgetContainerRef.current.innerHTML = "";

      const timeout = setTimeout(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
          "https://s3.tradingview.com/external-embedding/embed-widget-financials.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
          isTransparent: false,
          largeChartUrl: "",
          displayMode: "regular",
          width: "100%",
          height: 550,
          colorTheme: "dark",
          symbol: selectedSymbol,
          locale: "en",
        });

        widgetContainerRef.current.appendChild(script);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [symbol]);

  const onChange = (key) => {
    console.log("Active panel key:", key);
  };

  return (
    <div className="fundamental-dark-container">
      <Collapse
        defaultActiveKey={["0"]}
        onChange={onChange}
        className="dark-collapse"
      >
        <Panel header="Fundamental Data" key="1">
          <div className="tradingview-widget-container">
            <div
              className="tradingview-widget-container__widget"
              ref={widgetContainerRef}
            />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default FundamentalData;
