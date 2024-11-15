import { FormEvent, useState } from "react";
import { makeRequest } from "../utils/makeRequest";
import { useAppContext } from "../context/AppContext";
import { TransactionType } from "../types/types";

type Props = {
  transaction: TransactionType;
};

export default function Transaction({ transaction }: Props) {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="transaction">
      {editMode ? (
        <TransactionEdit transaction={transaction} setEditMode={setEditMode} />
      ) : (
        <TransactionView transaction={transaction} setEditMode={setEditMode} />
      )}
    </div>
  );
}

type TransactionProps = {
  transaction: TransactionType;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

function TransactionView({ transaction, setEditMode }: TransactionProps) {
  const {
    transactionsData,
    setTransactionsData,
    setLoading,
    currentPage,
    setCurrentPage,
    limit,
    setTotalPages,
    setBalance,
  } = useAppContext();

  async function deleteTransaction() {
    setLoading(true);

    const transLength = transactionsData.transactions.length;

    const body = { id: transaction._id };
    const data = await makeRequest("DELETE", body, currentPage, limit);
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
        <div className={`price ${transaction.isExpense ? "red" : "green"}`}>
          {transaction.isExpense ? "-" : "+"}
          {transaction.price.toFixed(2)}
        </div>
        <div className="date">{transaction.date}</div>
      </div>
      <div className="right">
        <button onClick={() => setEditMode(true)}>Edit</button>
        <button onClick={deleteTransaction}>Delete</button>
      </div>
    </>
  );
}

function TransactionEdit({ transaction, setEditMode }: TransactionProps) {
  const {
    setTransactionsData,
    setLoading,
    currentPage,
    limit,
    setTotalPages,
    setBalance,
  } = useAppContext();
  const [name, setName] = useState(transaction.name);
  const [price, setPrice] = useState(transaction.price);
  const [date, setDate] = useState(transaction.date);
  const [isExpense, setIsExpense] = useState(transaction.isExpense);
  const [description, setDescription] = useState(transaction.description);

  async function updateTransaction(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    let adjustedPrice = isExpense ? -price : price;

    const body = {
      name,
      adjustedPrice,
      description,
      date,
      id: transaction._id,
    };
    const data = await makeRequest("PUT", body, currentPage, limit);
    setTransactionsData(data);
    setTotalPages(data.totalPages);
    setBalance(data.total);
    setEditMode(false);
    setLoading(false);
  }

  return (
    <form onSubmit={updateTransaction}>
      <div className="left">
        <input
          type="text"
          className="name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          className="name-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="middle">
        <div>
          <div>
            <label htmlFor="type">Expense</label>
            <input
              id="type"
              type="checkbox"
              checked={isExpense}
              onChange={() => setIsExpense((prev) => !prev)}
            />
          </div>
          <input
            type="text"
            className="price-input"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            required
          />
        </div>
        <input
          className="date-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="right">
        <button type="submit">Done</button>
      </div>
    </form>
  );
}
