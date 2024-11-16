import { useAppContext } from "../context/AppContext";

export default function TransactionSort() {
  const { sortMethod, setSortMethod } = useAppContext();

  return (
    <div className="transaction-sort">
      <label htmlFor="sort-select">Sort: </label>
      <select
        id="sort-select"
        value={sortMethod}
        onChange={(e) => setSortMethod(e.target.value)}>
        <option value="date-dec">Date Decending</option>
        <option value="date-asc">Date Ascending</option>
        <option value="price-dec">Price Decending</option>
        <option value="price-asc">Price Ascending</option>
      </select>
    </div>
  );
}
