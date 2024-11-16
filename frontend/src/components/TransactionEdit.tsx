import { useState, FormEvent } from "react";
import { useAppContext } from "../context/AppContext";
import { TransactionType } from "../types/types";
import { makeRequest } from "../utils/makeRequest";

type Props = {
  transaction: TransactionType;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TransactionEdit({ transaction, setEditMode }: Props) {
  const {
    setTransactionsData,
    setLoading,
    currentPage,
    limit,
    setTotalPages,
    setBalance,
    sortMethod,
  } = useAppContext();
  const [name, setName] = useState(transaction.name);
  const [date, setDate] = useState(transaction.date.slice(0, 10));
  const [isExpense, setIsExpense] = useState(transaction.price < 0);
  const [description, setDescription] = useState(transaction.description);

  const formatPrice =
    transaction.price < 0
      ? transaction.price.toString().split("-")[1]
      : transaction.price.toString();
  const [price, setPrice] = useState(parseInt(formatPrice));

  async function updateTransaction(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const adjustedPrice = isExpense ? -price : price;

    const body = {
      name,
      price: adjustedPrice,
      description,
      date,
      id: transaction._id,
      sortMethod,
    };
    const data = await makeRequest("PUT", body, currentPage, limit, sortMethod);
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
