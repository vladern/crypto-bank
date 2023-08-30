import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Transaction } from './transaction';
import { AccountDetails } from './account-details';

@Injectable()
export abstract class AccountDetailsRepository {
    abstract getAllTransactions(accountID: number): Observable<Transaction[]>;
    abstract getAccountDetails(accountID: number): Observable<AccountDetails>;
    abstract onChangeSomeTransactionOf(accountID: number): Observable<Transaction>;
}