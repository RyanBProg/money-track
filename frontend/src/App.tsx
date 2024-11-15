import { useEffect, useState } from "react";
import "./App.css";
import TransacationsList from "./components/TransacationsList";
import TransactionForm from "./components/TransactionForm";
import Pagination from "./components/Pagination";
import { makeRequest } from "./utils/makeRequest";
import { useAppContext } from "./context/AppContext";

export default function App() {
  const [sortMethod, setSortMethod] = useState("");

  const {
    loading,
    setLoading,
    setTransactionsData,
    setTotalPages,
    balance,
    setBalance,
    currentPage,
    limit,
  } = useAppContext();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await makeRequest("GET", undefined, currentPage, limit);
      setTransactionsData(data);
      setTotalPages(data.totalPages);
      setBalance(data.total);
      setLoading(false);
    }

    fetchData();
  }, [currentPage]);

  const balanceWhole = balance.toFixed(2).split(".")[0];
  const balanceDecimal = balance.toFixed(2).split(".")[1];

  return (
    <main>
      <h1>
        ${balanceWhole}
        <span>.{balanceDecimal}</span>
      </h1>
      <TransactionForm />
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <TransacationsList
            sortMethod={sortMethod}
            setSortMethod={setSortMethod}
          />
          <Pagination />
        </>
      )}
    </main>
  );
}
