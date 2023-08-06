import { Injectable } from '@nestjs/common';
import { AccountDetailsService } from '../domain/account-detail.service';
import { Transaction } from '../domain/transactions';
import { AccountDetails } from '../domain/account-details.model';
import { transactionsMocks } from 'src/db/transactions';
import { accounts } from 'src/db/accounts';
import { accountTransactions } from 'src/db/account-transactions';

@Injectable()
export class AccountDetailsMockService extends AccountDetailsService {
  constructor() {
    super();
  }

  getAccountDetailsTransactions(accountId: number): Promise<Transaction[]> {
    const transactions = transactionsMocks.filter((transaction) => {
      return accountTransactions[accountId].includes(transaction.id);
    });
    return Promise.resolve(transactions);
  }

  getAccountDetails(accountId: number): Promise<AccountDetails> {
    const account = accounts.find((account) => account.id === accountId);
    return Promise.resolve({
      name: account.name,
      category: account.category,
      balance: account.balance,
      unconfirmedFunds: Math.floor(Math.random() * 10000),
    });
  }
}
