import { TransactionType } from "../types/types";

export function sortTransactions(
  trans1: TransactionType,
  trans2: TransactionType,
  sortMethod: string
) {
  const price1 = trans1.isExpense ? -trans1.price : trans1.price;
  const price2 = trans2.isExpense ? -trans2.price : trans2.price;

  switch (sortMethod) {
    case "date-asc":
      return (
        new Date(trans1.date || 0).getTime() -
        new Date(trans2.date || 0).getTime()
      );
    case "date-dec":
      return (
        new Date(trans2.date || 0).getTime() -
        new Date(trans1.date || 0).getTime()
      );
    case "price-asc":
      return price1 - price2;
    case "price-dec":
      return price2 - price1;
    default:
      return 0;
  }
}
