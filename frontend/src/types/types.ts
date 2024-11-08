export type TransactionType = {
  _id: string;
  name: string;
  price: number;
  description: string;
  date: string;
  isExpense: boolean;
  __v: number;
};

export type Transactions = {
  transactions: TransactionType[];
  total: number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
};

export type RequestBody = {
  name?: string;
  price?: string;
  description?: string;
  date?: string;
  isExpense?: boolean;
  id?: string;
};

export type AppContextType = {
  transactionsData: Transactions | [];
  setTransactionsData: React.Dispatch<React.SetStateAction<Transactions | []>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  balance: string;
  setBalance: React.Dispatch<React.SetStateAction<string>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
};
