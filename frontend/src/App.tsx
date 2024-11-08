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
      const data = await makeRequest("GET", {}, currentPage, limit);
      setTransactionsData(data);
      setTotalPages(data.totalPages);
      setBalance(data.total.toFixed(2).toString());
      setLoading(false);
    }

    fetchData();
  }, [currentPage]);

  const balanceWhole = balance.split(".")[0];
  const balanceDecimal = balance.split(".")[1];

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
