import React, { createContext, useState } from "react";

export const SymbolContext = createContext();

export const SymbolProvider = ({ children }) => {
    const [symbol, setSymbol] = useState("NASDAQ:AAPL"); // Default symbol

    return (
        <SymbolContext.Provider value={{ symbol, setSymbol }}>
            {children}
        </SymbolContext.Provider>
    );
};
