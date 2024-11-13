import { createContext, useContext, useState, ReactNode } from "react";
import { AppContextType, Transactions } from "../types/types";

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialData = {
  transactions: [],
  total: 0,
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [transactionsData, setTransactionsData] =
    useState<Transactions>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [balance, setBalance] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const limit = 10;

  const valueProp: AppContextType = {
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
  };

  return (
    <AppContext.Provider value={valueProp}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
