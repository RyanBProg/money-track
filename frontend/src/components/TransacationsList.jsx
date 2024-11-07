import { useAppContext } from "../context/AppContext";
import Transaction from "./Transaction";
import TransactionSort from "../components/TransactionSort";
import { sortTransactions } from "../utils/sortTransactions";

export default function TransacationsList({ sortMethod, setSortMethod }) {
  const { transactionsData } = useAppContext();

  return (
    <div className="transactions">
      <TransactionSort sortMethod={sortMethod} setSortMethod={setSortMethod} />
      {transactionsData.transactions.length > 0 &&
        transactionsData.transactions
          .slice()
          .sort((a, b) => sortTransactions(a, b, sortMethod))
          .map((transaction) => {
            return (
              <Transaction key={transaction._id} transaction={transaction} />
            );
          })}
      {transactionsData.transactions.length === 0 && (
        <p className="no-transactions">- No Transactions -</p>
      )}
    </div>
  );
}
