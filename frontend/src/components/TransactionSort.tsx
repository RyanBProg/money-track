type Props = {
  sortMethod: string;
  setSortMethod: React.Dispatch<React.SetStateAction<string>>;
};

export default function TransactionSort({ sortMethod, setSortMethod }: Props) {
  return (
    <div className="transaction-sort">
      <label htmlFor="sort-select">Sort: </label>
      <select
        id="sort-select"
        value={sortMethod}
        onChange={(e) => setSortMethod(e.target.value)}>
        <option value="date-asc">Date Ascending</option>
        <option value="date-dec">Date Decending</option>
        <option value="price-asc">Price Ascending</option>
        <option value="price-dec">Price Decending</option>
      </select>
    </div>
  );
}
