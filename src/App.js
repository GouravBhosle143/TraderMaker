import React from "react";
import StockList from "./components/StockList";
import MainPanel from "./components/MainPanel";
import './styles/styles.css';
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <StockList />
      <MainPanel />
    </div>
  );
};

export default App;
  