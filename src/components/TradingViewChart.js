import React, { useEffect, useRef, useContext } from "react";
import { Select, MenuItem } from "@mui/material";
import { SymbolContext } from "../context/SymbolContext";

const TradingViewChart = () => {
    const container = useRef(null);
    const { symbol, setSymbol } = useContext(SymbolContext); 

    useEffect(() => {
        if (container.current) {
            container.current.innerHTML = ""; 

            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/tv.js";
            script.async = true;

            script.onload = () => {
                new window.TradingView.widget({
                    container_id: "tradingview-chart",
                    width: "100%",
                    height: "500px",
                    symbol: symbol, 
                    interval: "D",
                    timezone: "Etc/UTC",
                    theme: "dark",
                    style: "1",
                    toolbar_bg: "#f1f3f6",
                    enable_publishing: false,
                    hide_legend: false,
                    allow_symbol_change: true,
                });
            };

            document.body.appendChild(script);

            return () => {
                script.remove(); // Clean up
            };
        }
    }, [symbol]);

    return (
        <div style={{ width: "100%", alignItems: "center" }}>
            <div className="selector-btn">
                <Select value={symbol} onChange={(e) => setSymbol(e.target.value)} style={{ width: "200px" }}>
                    <MenuItem value="NASDAQ:AAPL">Apple (AAPL)</MenuItem>
                    <MenuItem value="NASDAQ:TSLA">Tesla (TSLA)</MenuItem>
                    <MenuItem value="NASDAQ:GOOGL">Google (GOOGL)</MenuItem>
                    <MenuItem value="NASDAQ:AMZN">Amazon (AMZN)</MenuItem>
                </Select>
            </div>

            <div id="tradingview-chart" ref={container} style={{ height: "500px", width: "100%" }} />
        </div>
    );
};

export default TradingViewChart;
