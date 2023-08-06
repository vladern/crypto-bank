import { Injectable } from '@nestjs/common';
import { Transaction } from './transactions';
import { AccountDetails } from './account-details.model';

@Injectable()
export abstract class AccountDetailsService {
  abstract getAccountDetailsTransactions(
    accountId: number,
  ): Promise<Transaction[]>;

  abstract getAccountDetails(accountId: number): Promise<AccountDetails>;
}
