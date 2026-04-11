"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

type CoinContextType = {
  coins: number;
  addCoins: (amount: number) => void;
};

const CoinContext = createContext<CoinContextType | null>(null);

export function CoinProvider({ children }: { children: React.ReactNode }) {
  const [coins, setCoins] = useState(0);

  const addCoins = useCallback((amount: number) => {
    setCoins((prev) => prev + amount);
  }, []);

  return (
    <CoinContext.Provider value={{ coins, addCoins }}>
      {children}
    </CoinContext.Provider>
  );
}

export function useCoinCounter() {
  const context = useContext(CoinContext);
  if (!context) {
    throw new Error("useCoinCounter must be used within a CoinProvider");
  }
  return context;
}
