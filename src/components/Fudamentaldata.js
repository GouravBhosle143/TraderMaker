import React, { useEffect, useContext } from "react";
import { SymbolContext } from "../context/SymbolContext";

const FundamentalData = () => {
    const { symbol, setSymbol } = useContext(SymbolContext);

    useEffect(() => {
        const container = document.querySelector(".tradingview-widget-container__widget");
        if (container) {
            container.innerHTML = "";

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
                symbol: symbol,
                locale: "en",
            });

            container.appendChild(script);
        }
    }, [symbol]);

    return (
        <div style={{ width: "100%", alignItems: "center" }}>
            <div className="tradingview-widget-containe">
                <div className="tradingview-widget-container__widget"></div>
            </div>
        </div>
    );
};

export default FundamentalData;
