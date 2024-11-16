import { useState } from "react";
import { TransactionType } from "../types/types";
import TransactionEdit from "./TransactionEdit";
import TransactionView from "./TransactionView";

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
