import React, { useEffect, useRef, useContext, useState } from "react";
import {
  Select,
  MenuItem,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Collapse,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { SymbolContext } from "../context/SymbolContext";

import html2canvas from "html2canvas";
import ReactApexChart from 'react-apexcharts';

const TradingViewChart = () => {
  const container = useRef(null);
  const { symbol, setSymbol } = useContext(SymbolContext);
  const [note, setNote] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [researchDialogOpen, setResearchDialogOpen] = useState(false);
  // const [chartData, setChartData] = useState({
  //   series: [{
  //     name: 'candle',
  //     data: [
  //       { x: new Date(2024, 0, 1), y: [197.20, 198.83, 194.42, 196.98] },
  //       { x: new Date(2024, 0, 2), y: [196.50, 199.20, 195.80, 198.40] },
  //       { x: new Date(2024, 0, 3), y: [198.40, 200.10, 197.30, 199.80] },
  //       { x: new Date(2024, 0, 4), y: [199.80, 202.00, 198.90, 201.50] },
  //       { x: new Date(2024, 0, 5), y: [201.50, 204.20, 200.80, 203.70] },
  //       { x: new Date(2024, 0, 8), y: [203.70, 205.00, 202.10, 204.50] },
  //       { x: new Date(2024, 0, 9), y: [204.50, 207.40, 203.90, 206.80] },
  //       { x: new Date(2024, 0, 10), y: [206.80, 208.30, 205.70, 207.90] },
  //       { x: new Date(2024, 0, 11), y: [207.90, 210.10, 207.00, 209.50] },
  //       { x: new Date(2024, 0, 12), y: [209.50, 211.30, 208.40, 210.80] },
  //       { x: new Date(2024, 0, 15), y: [210.80, 212.00, 209.20, 211.70] },
  //       { x: new Date(2024, 0, 16), y: [211.70, 213.60, 210.50, 212.90] },
  //       { x: new Date(2024, 0, 17), y: [212.90, 215.20, 211.80, 214.50] },
  //       { x: new Date(2024, 0, 18), y: [214.50, 216.00, 213.30, 215.70] },
  //       { x: new Date(2024, 0, 19), y: [215.70, 218.40, 214.60, 217.90] },
  //       { x: new Date(2024, 0, 22), y: [217.90, 220.00, 216.80, 219.30] },
  //       { x: new Date(2024, 0, 23), y: [219.30, 221.10, 218.20, 220.40] },
  //       { x: new Date(2024, 0, 24), y: [220.40, 223.00, 219.50, 222.30] },
  //       { x: new Date(2024, 0, 25), y: [222.30, 224.50, 221.60, 223.90] },
  //       { x: new Date(2024, 0, 26), y: [223.90, 226.20, 222.80, 225.50] },
  //       { x: new Date(2024, 0, 29), y: [225.50, 227.10, 224.30, 226.80] },
  //       { x: new Date(2024, 0, 30), y: [226.80, 229.00, 225.90, 228.20] },
  //       { x: new Date(2024, 0, 31), y: [228.20, 230.40, 227.10, 229.90] }
  //     ]
  //   }, ...(showVolume ? [{
  //     name: 'volume',
  //     type: 'bar',
  //     data: [
  //       { x: new Date(2024, 0, 1), y: 52160000 },
  //       { x: new Date(2024, 0, 2), y: 48250000 },
  //       { x: new Date(2024, 0, 3), y: 45780000 },
  //       { x: new Date(2024, 0, 4), y: 62340000 },
  //       { x: new Date(2024, 0, 5), y: 58920000 },
  //       { x: new Date(2024, 0, 8), y: 43250000 },
  //       { x: new Date(2024, 0, 9), y: 51430000 },
  //       { x: new Date(2024, 0, 10), y: 49870000 },
  //       { x: new Date(2024, 0, 11), y: 55680000 },
  //       { x: new Date(2024, 0, 12), y: 47920000 },
  //       { x: new Date(2024, 0, 15), y: 42340000 },
  //       { x: new Date(2024, 0, 16), y: 53670000 },
  //       { x: new Date(2024, 0, 17), y: 48920000 },
  //       { x: new Date(2024, 0, 18), y: 51240000 },
  //       { x: new Date(2024, 0, 19), y: 46780000 },
  //       { x: new Date(2024, 0, 22), y: 53460000 },
  //       { x: new Date(2024, 0, 23), y: 49520000 },
  //       { x: new Date(2024, 0, 24), y: 51830000 },
  //       { x: new Date(2024, 0, 25), y: 55240000 },
  //       { x: new Date(2024, 0, 26), y: 48670000 },
  //       { x: new Date(2024, 0, 29), y: 47280000 },
  //       { x: new Date(2024, 0, 30), y: 50130000 },
  //       { x: new Date(2024, 0, 31), y: 53920000 }
  //     ]
  //   }] : [])
  //   ],
  //   options: {
  //     chart: {
  //       type: 'candlestick',
  //       height: 500,
  //       background: '#000',
  //       toolbar: {
  //         show: true,
  //         tools: {
  //           download: true,
  //           selection: true,
  //           zoom: true,
  //           zoomin: true,
  //           zoomout: true,
  //           pan: true,
  //         }
  //       }
  //     },
  //     title: {
  //       text: symbol,
  //       align: 'left',
  //       style: {
  //         color: '#fff'
  //       }
  //     },
  //     xaxis: {
  //       type: 'datetime',
  //       labels: {
  //         style: {
  //           colors: '#fff'
  //         }
  //       }
  //     },
  //     yaxis: [{
  //       tooltip: {
  //         enabled: true
  //       },
  //       labels: {
  //         style: {
  //           colors: '#fff'
  //         }
  //       }
  //     }, {
  //       opposite: true,
  //       labels: {
  //         style: {
  //           colors: '#fff'
  //         }
  //       }
  //     }],
  //     grid: {
  //       borderColor: '#333'
  //     },
  //     plotOptions: {
  //       candlestick: {
  //         colors: {
  //           upward: '#26C281',
  //           downward: '#ED3419'
  //         }
  //       }
  //     }
  //   }
  // });

  const [chartData, setChartData] = useState({ series: [], options: {} });
  useEffect(() => {
    const candleData = [
      { x: new Date(2024, 0, 1), y: [197.20, 198.83, 194.42, 196.98] },
      { x: new Date(2024, 0, 2), y: [196.50, 199.20, 195.80, 198.40] },
      { x: new Date(2024, 0, 3), y: [198.40, 200.10, 197.30, 199.80] },
      { x: new Date(2024, 0, 4), y: [199.80, 202.00, 198.90, 201.50] },
      { x: new Date(2024, 0, 5), y: [201.50, 204.20, 200.80, 203.70] },
      { x: new Date(2024, 0, 8), y: [203.70, 205.00, 202.10, 204.50] },
      { x: new Date(2024, 0, 9), y: [204.50, 207.40, 203.90, 206.80] },
      { x: new Date(2024, 0, 10), y: [206.80, 208.30, 205.70, 207.90] },
      { x: new Date(2024, 0, 11), y: [207.90, 210.10, 207.00, 209.50] },
      { x: new Date(2024, 0, 12), y: [209.50, 211.30, 208.40, 210.80] },
      { x: new Date(2024, 0, 15), y: [210.80, 212.00, 209.20, 211.70] },
      { x: new Date(2024, 0, 16), y: [211.70, 213.60, 210.50, 212.90] },
      { x: new Date(2024, 0, 17), y: [212.90, 215.20, 211.80, 214.50] },
      { x: new Date(2024, 0, 18), y: [214.50, 216.00, 213.30, 215.70] },
      { x: new Date(2024, 0, 19), y: [215.70, 218.40, 214.60, 217.90] },
      { x: new Date(2024, 0, 22), y: [217.90, 220.00, 216.80, 219.30] },
      { x: new Date(2024, 0, 23), y: [219.30, 221.10, 218.20, 220.40] },
      { x: new Date(2024, 0, 24), y: [220.40, 223.00, 219.50, 222.30] },
      { x: new Date(2024, 0, 25), y: [222.30, 224.50, 221.60, 223.90] },
      { x: new Date(2024, 0, 26), y: [223.90, 226.20, 222.80, 225.50] },
      { x: new Date(2024, 0, 29), y: [225.50, 227.10, 224.30, 226.80] },
      { x: new Date(2024, 0, 30), y: [226.80, 229.00, 225.90, 228.20] },
      { x: new Date(2024, 0, 31), y: [228.20, 230.40, 227.10, 229.90] }
    ];

    const volumeData = [
      { x: new Date(2024, 0, 1), y: 52160000 },
      { x: new Date(2024, 0, 2), y: 48250000 },
      { x: new Date(2024, 0, 3), y: 45780000 },
      { x: new Date(2024, 0, 4), y: 62340000 },
      { x: new Date(2024, 0, 5), y: 58920000 },
      { x: new Date(2024, 0, 8), y: 43250000 },
      { x: new Date(2024, 0, 9), y: 51430000 },
      { x: new Date(2024, 0, 10), y: 49870000 },
      { x: new Date(2024, 0, 11), y: 55680000 },
      { x: new Date(2024, 0, 12), y: 47920000 },
      { x: new Date(2024, 0, 15), y: 42340000 },
      { x: new Date(2024, 0, 16), y: 53670000 },
      { x: new Date(2024, 0, 17), y: 48920000 },
      { x: new Date(2024, 0, 18), y: 51240000 },
      { x: new Date(2024, 0, 19), y: 46780000 },
      { x: new Date(2024, 0, 22), y: 53460000 },
      { x: new Date(2024, 0, 23), y: 49520000 },
      { x: new Date(2024, 0, 24), y: 51830000 },
      { x: new Date(2024, 0, 25), y: 55240000 },
      { x: new Date(2024, 0, 26), y: 48670000 },
      { x: new Date(2024, 0, 29), y: 47280000 },
      { x: new Date(2024, 0, 30), y: 50130000 },
      { x: new Date(2024, 0, 31), y: 53920000 }
    ];

    const series = [
      { name: 'candle', data: candleData },
      ...(showVolume ? [{ name: 'volume', type: 'bar', data: volumeData }] : [])
    ];

    const options = {
      chart: {
        type: 'candlestick',
        height: 600,
        background: '#000',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
          }
        }
      },
      title: {
        text: symbol,
        align: 'left',
        style: { color: '#fff' }
      },
      xaxis: {
        type: 'datetime',
        labels: {
          rotate: -45, // ya 0, 45, -90 as per preference
          style: {
            colors: '#fff',
            fontSize: '10px' // font size kam karo
          },
          datetimeFormatter: {
            year: 'yyyy',
            month: "MMM 'yy",
            day: 'dd MMM',
            hour: 'HH:mm',
          }
        }
      },
      yaxis: [{
        labels: { style: { colors: '#fff' } }
      }, {
        opposite: true,
        labels: { style: { colors: '#fff' } }
      }],
      grid: { borderColor: '#333' },
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#26C281',
            downward: '#ED3419'
          }
        }
      },
      theme: { mode: 'dark' }
    };

    setChartData({ series, options });
  }, [symbol, showVolume]);

  const handleSymbolChange = (e) => setSymbol(e.target.value);
  const handleResearchOpen = () => setResearchDialogOpen(true);
  const handleResearchClose = () => setResearchDialogOpen(false);

  const handleSaveImage = async () => {
    const captureElement = document.getElementById("chart-wrapper");
    if (captureElement) {
      const canvas = await html2canvas(captureElement, {
        backgroundColor: "#000",
      });
      const link = document.createElement("a");
      const fileName = `chart-${symbol}-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.png`;
      link.download = fileName;
      link.href = canvas.toDataURL();
      link.click();

      setNote("");
      setShowNotes(false);
    }
  };

  return (
    <div style={{ width: "100%", color: "#fff", padding: "0px" }}>
      <div className="select-symbol" style={{ marginBottom: "15px" }}>
        <Select
          value={symbol}
          onChange={handleSymbolChange}
          style={{ width: "200px", background: "#333", color: "#fff" }}
        >
          <MenuItem value="AAPL">Apple (AAPL)</MenuItem>
          <MenuItem value="TSLA">Tesla (TSLA)</MenuItem>
          <MenuItem value="GOOGL">Google (GOOGL)</MenuItem>
          <MenuItem value="AMZN">Amazon (AMZN)</MenuItem>
        </Select>

        <Button
          onClick={handleResearchOpen}
          variant="contained"
          color="primary"
          style={{ marginLeft: "20px" }}
        >
          Research
        </Button>

        <FormControlLabel
          control={
            <Switch
              checked={showVolume}
              onChange={() => setShowVolume(!showVolume)}
              color="primary"
            />
          }
          label="Show Volume"
          style={{ marginLeft: "20px" }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={showNotes}
              onChange={() => setShowNotes(!showNotes)}
              color="primary"
            />
          }
          label="Show Notes"
          style={{ marginLeft: "20px" }}
        />
      </div>

      <Collapse in={showNotes}>
        <TextField
          label="Your Thoughts on the Chart"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          multiline
          rows={4}
          style={{ width: "100%", marginBottom: "10px" }}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleSaveImage}
          style={{ marginBottom: "20px" }}
        >
          Save Thought
        </Button>
      </Collapse>

      {/* <div className="mixed-chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="candlestick"
          height={500}
        />
      </div> */}

      <div id="chart-wrapper">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line" // use 'line' to allow mixed types like candlestick and bar
          height={550}
        />
      </div>

      {/* Research Dialog */}
      <Dialog open={researchDialogOpen} onClose={handleResearchClose}>
        <DialogTitle>Research Criteria</DialogTitle>
        <DialogContent>
          <p>Select criteria for research...</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResearchClose} color="primary">Cancel</Button>
          <Button onClick={handleResearchClose} color="primary">Apply</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TradingViewChart;
