import React, { useEffect, useContext, useRef } from "react";
import { SymbolContext } from "../context/SymbolContext";

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
                script.src = "https://s3.tradingview.com/external-embedding/embed-widget-financials.js";
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

    return (
        <div style={{ width: "100%", alignItems: "center" }}>
            <div className="tradingview-widget-container">
                <div className="tradingview-widget-container__widget" ref={widgetContainerRef}></div>
            </div>
        </div>
    );
};

export default FundamentalData;
