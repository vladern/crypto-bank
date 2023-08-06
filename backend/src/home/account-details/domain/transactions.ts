export interface Transaction {
  id: number;
  confirmedDate: Date;
  orderID: string;
  orderCode: string;
  transactionType: string;
  debit: number;
  credit: number;
  balance: number;
}
