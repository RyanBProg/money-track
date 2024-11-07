export function sortTransactions(trans1, trans2, sortMethod) {
  const price1 = trans1.isExpense ? -trans1.price : trans1.price;
  const price2 = trans2.isExpense ? -trans2.price : trans2.price;

  switch (sortMethod) {
    case "date-asc":
      return new Date(trans1.date) - new Date(trans2.date);
    case "date-dec":
      return new Date(trans2.date) - new Date(trans1.date);
    case "price-asc":
      return price1 - price2;
    case "price-dec":
      return price2 - price1;
    default:
      return 0;
  }
}
