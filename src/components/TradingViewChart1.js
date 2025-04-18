import React, { useEffect, useRef, useContext, useState } from "react";
import { Select, MenuItem, Button } from "@mui/material";
import { SymbolContext } from "../context/SymbolContext";
import html2canvas from "html2canvas";

const TradingViewChart = () => {
    const container = useRef(null);
    const canvasRef = useRef(null);
    const { symbol, setSymbol } = useContext(SymbolContext);
    const [drawingMode, setDrawingMode] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false);

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
                script.remove();
            };
        }
    }, [symbol]);


    useEffect(() => {
        if (!drawingMode) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        let isDrawing = false;

        const startDraw = (e) => {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            ctx.beginPath();
            ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        };

        const draw = (e) => {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
            ctx.strokeStyle = "#00ff00";
            ctx.lineWidth = 2;
            ctx.stroke();
        };

        const endDraw = () => {
            isDrawing = false;
            ctx.closePath();
            setShowSaveButton(true);
        };

        canvas.addEventListener("mousedown", startDraw);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", endDraw);
        canvas.addEventListener("mouseleave", endDraw);

        return () => {
            canvas.removeEventListener("mousedown", startDraw);
            canvas.removeEventListener("mousemove", draw);
            canvas.removeEventListener("mouseup", endDraw);
            canvas.removeEventListener("mouseleave", endDraw);
        };
    }, [drawingMode]);


    const handleSaveImage = async () => {
        const chartElement = container.current;
        const drawingCanvas = canvasRef.current;

        if (!chartElement || !drawingCanvas) return;

        // Step 1: Take screenshot of chart container
        const chartScreenshot = await html2canvas(chartElement, {
            backgroundColor: null,
            useCORS: true,
            scale: 2,
        });

        // Step 2: Draw chart screenshot and drawing canvas into new final canvas
        const finalCanvas = document.createElement("canvas");
        finalCanvas.width = chartScreenshot.width;
        finalCanvas.height = chartScreenshot.height;

        const ctx = finalCanvas.getContext("2d");

        // Draw chart image
        ctx.drawImage(chartScreenshot, 0, 0);

        // Draw drawing canvas on top
        ctx.drawImage(drawingCanvas, 0, 0);

        // Step 3: Save the final combined image
        const link = document.createElement("a");
        link.download = `chart-with-drawing-${Date.now()}.png`;
        link.href = finalCanvas.toDataURL("image/png");
        link.click();
    };

    const handleEnableDraw = () => {
        setDrawingMode(true);
        setShowSaveButton(false);

        // Auto scroll to chart area
        setTimeout(() => {
            container.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    return (
        <div style={{ position: "relative", width: "100%" }}>
            <div style={{ marginBottom: "10px" }}>
                <Select value={symbol} onChange={(e) => setSymbol(e.target.value)} style={{ width: "200px" }}>
                    <MenuItem value="NASDAQ:AAPL">Apple (AAPL)</MenuItem>
                    <MenuItem value="NASDAQ:TSLA">Tesla (TSLA)</MenuItem>
                    <MenuItem value="NASDAQ:GOOGL">Google (GOOGL)</MenuItem>
                    <MenuItem value="NASDAQ:AMZN">Amazon (AMZN)</MenuItem>
                </Select>
                <Button onClick={handleEnableDraw} variant="contained" color="primary" style={{ marginLeft: "20px" }}>
                    Draw on Chart
                </Button>
                {showSaveButton && (
                    <Button
                        onClick={handleSaveImage}
                        variant="contained"
                        color="success"
                        style={{ marginLeft: "20px" }}
                    >
                        Save Drawing
                    </Button>
                )}
            </div>

            <div
                id="tradingview-chart"
                ref={container}
                style={{ width: "100%", height: "500px", position: "relative", zIndex: 1 }}
            />

            {/* Canvas Overlay */}
            {drawingMode && (
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        top: "66px",
                        left: "0px",
                        width: container.current?.offsetWidth || 1000,
                        height: container.current?.offsetHeight || 500,
                        zIndex: 999,
                        pointerEvents: "auto",
                        cursor: "crosshair",
                        border: "1px solid #fff"
                    }}
                />
            )}
        </div>
    );
};

export default TradingViewChart;

