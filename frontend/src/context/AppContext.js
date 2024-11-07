import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [balance, setBalance] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  return (
    <AppContext.Provider
      value={{
        transactionsData,
        setTransactionsData,
        loading,
        setLoading,
        currentPage,
        setCurrentPage,
        balance,
        setBalance,
        totalPages,
        setTotalPages,
        limit,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
