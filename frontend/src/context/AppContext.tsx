import { createContext, useContext, useState, ReactNode } from "react";
import { AppContextType, Transactions } from "../types/types";
import {
  DEFAULT_SORT,
  DEFAULT_TRANSACTION_DATA,
  PAGINATION_LIMIT,
} from "../utils/defaults";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [transactionsData, setTransactionsData] = useState<Transactions>(
    DEFAULT_TRANSACTION_DATA
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [balance, setBalance] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortMethod, setSortMethod] = useState(DEFAULT_SORT);

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
    limit: PAGINATION_LIMIT,
    sortMethod,
    setSortMethod,
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
