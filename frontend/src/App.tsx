import { useEffect } from "react";
import "./App.css";
import TransacationsList from "./components/TransacationsList";
import TransactionForm from "./components/TransactionForm";
import Pagination from "./components/Pagination";
import { makeRequest } from "./utils/makeRequest";
import { useAppContext } from "./context/AppContext";

export default function App() {
  const {
    loading,
    setLoading,
    setTransactionsData,
    setTotalPages,
    balance,
    setBalance,
    currentPage,
    limit,
    sortMethod,
  } = useAppContext();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await makeRequest(
        "GET",
        undefined,
        currentPage,
        limit,
        sortMethod
      );
      setTransactionsData(data);
      setTotalPages(data.totalPages);
      setBalance(data.total);
      setLoading(false);
    }

    fetchData();
  }, [currentPage, sortMethod]);

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
          <TransacationsList />
          <Pagination />
        </>
      )}
    </main>
  );
}
