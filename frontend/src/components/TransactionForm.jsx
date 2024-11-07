import { useState } from "react";
import makeRequest from "../utils/makeRequest";
import { useAppContext } from "../context/AppContext";

export default function TransactionForm() {
  const {
    setTransactionsData,
    setLoading,
    currentPage,
    limit,
    setTotalPages,
    setBalance,
  } = useAppContext();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [isExpense, setIsExpense] = useState(false);
  const [description, setDescription] = useState("");

  async function addNewTransaction(e) {
    e.preventDefault();
    setLoading(true);

    const body = { name, price, description, date, isExpense };
    const data = await makeRequest("POST", body, currentPage, limit);
    setTransactionsData(data);
    setTotalPages(data.totalPages);
    setBalance(data.total.toFixed(2).toString());

    setLoading(false);
    setName("");
    setPrice("");
    setDate("");
    setIsExpense(false);
    setDescription("");
  }

  return (
    <form onSubmit={addNewTransaction}>
      <div className="entry-title">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder={"New samsung tv"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="entry-details">
        <div className="price-input-container">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="text"
            placeholder="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <span className="currency-icon">$</span>
        </div>
        <div>
          <label htmlFor="date">Date-Time</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="type">Expense</label>
          <input
            id="type"
            type="checkbox"
            checked={isExpense}
            onChange={() => setIsExpense((prev) => !prev)}
          />
        </div>
      </div>
      <div className="entry-description">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          placeholder={"Description"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add New Transation</button>
    </form>
  );
}
