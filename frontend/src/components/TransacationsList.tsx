import { useAppContext } from "../context/AppContext";
import Transaction from "./Transaction";
import TransactionSort from "./TransactionSort";
import { sortTransactions } from "../utils/sortTransactions";
import { TransactionType } from "../types/types";

type TransactionProps = {
  sortMethod: string;
  setSortMethod: React.Dispatch<React.SetStateAction<string>>;
};

export default function TransacationsList({
  sortMethod,
  setSortMethod,
}: TransactionProps) {
  const { transactionsData } = useAppContext();

  return (
    <div className="transactions">
      <TransactionSort sortMethod={sortMethod} setSortMethod={setSortMethod} />
      {transactionsData.transactions.length > 0 &&
        transactionsData.transactions
          .slice()
          .sort((a: TransactionType, b: TransactionType) =>
            sortTransactions(a, b, sortMethod)
          )
          .map((transaction: TransactionType) => {
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
