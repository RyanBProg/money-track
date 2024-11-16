import { useAppContext } from "../context/AppContext";
import { TransactionType } from "../types/types";
import { makeRequest } from "../utils/makeRequest";

type Props = {
  transaction: TransactionType;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TransactionView({ transaction, setEditMode }: Props) {
  const {
    transactionsData,
    setTransactionsData,
    setLoading,
    currentPage,
    setCurrentPage,
    limit,
    setTotalPages,
    setBalance,
    sortMethod,
  } = useAppContext();

  async function deleteTransaction() {
    setLoading(true);

    const transLength = transactionsData.transactions.length;

    const body = { id: transaction._id, sortMethod };
    const data = await makeRequest(
      "DELETE",
      body,
      currentPage,
      limit,
      sortMethod
    );
    setTransactionsData(data);
    setTotalPages(data.totalPages);
    setBalance(data.total);

    // go back a page if you delete the last transaction
    if (transLength === 1 && currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    }

    setLoading(false);
  }

  return (
    <>
      <div className="left">
        <div className="name">{transaction.name}</div>
        <div className="description">{transaction.description}</div>
      </div>
      <div className="middle">
        <div className={`price ${transaction.price < 0 ? "red" : "green"}`}>
          {transaction.price.toFixed(2)}
        </div>
        <div className="date">{transaction.date.slice(0, 10)}</div>
      </div>
      <div className="right">
        <button onClick={() => setEditMode(true)}>Edit</button>
        <button onClick={deleteTransaction}>Delete</button>
      </div>
    </>
  );
}
