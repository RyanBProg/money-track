import { useState } from "react";
import makeRequest from "../utils/makeRequest";
import { useAppContext } from "../context/AppContext";

export default function Transaction({ transaction }) {
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

function TransactionView({ transaction, setEditMode }) {
  const {
    setTransactionsData,
    setLoading,
    currentPage,
    limit,
    setTotalPages,
    setBalance,
  } = useAppContext();

  async function deleteTransaction() {
    setLoading(true);
    const body = { id: transaction._id };
    const data = await makeRequest("DELETE", body, currentPage, limit);
    setTransactionsData(data);
    setTotalPages(data.totalPages);
    setBalance(data.total.toFixed(2).toString());
    setEditMode(false);
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

function TransactionEdit({ transaction, setEditMode }) {
  const {
    setTransactionsData,
    setLoading,
    currentPage,
    limit,
    setTotalPages,
    setBalance,
  } = useAppContext();
  const [name, setName] = useState(transaction.name);
  const [price, setPrice] = useState(transaction.price.toFixed(2));
  const [date, setDate] = useState(transaction.date);
  const [isExpense, setIsExpense] = useState(transaction.isExpense);
  const [description, setDescription] = useState(transaction.description);

  async function updateTransaction(e) {
    e.preventDefault();
    setLoading(true);
    const body = {
      name,
      price,
      description,
      date,
      isExpense,
      id: transaction._id,
    };
    const data = await makeRequest("PUT", body, currentPage, limit);
    setTransactionsData(data);
    setTotalPages(data.totalPages);
    setBalance(data.total.toFixed(2).toString());
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
            onChange={(e) => setPrice(e.target.value)}
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
