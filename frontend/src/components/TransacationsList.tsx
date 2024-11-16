import { useAppContext } from "../context/AppContext";
import Transaction from "./Transaction";
import TransactionSort from "./TransactionSort";
import { TransactionType } from "../types/types";

export default function TransacationsList() {
  const { transactionsData } = useAppContext();

  return (
    <div className="transactions">
      <TransactionSort />
      {transactionsData.transactions.length > 0 &&
        transactionsData.transactions.map((transaction: TransactionType) => {
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
