import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AccountDetailsRepository } from "../domain/account-details-repository";
import { Transaction } from "../domain/transaction";
import { AccountDetails } from "../domain/account-details";

const transactionsMocks: Transaction[] = [
    { confirmedDate: new Date(2020, 11, 2, 14, 59), orderID: 'BXT7GU', orderCode: 'SETLMENT', transactionType: 'Paiment recived', debit: undefined, credit: 1, balance: 1 },
    { confirmedDate: new Date(2020, 11, 2, 14, 58), orderID: 'BXT7GA', orderCode: 'SETLMENT', transactionType: 'Paiment recived', debit: undefined, credit: 1, balance: 1 },
    { confirmedDate: new Date(2020, 11, 2, 14, 57), orderID: 'BXT7G9', orderCode: 'SETLMENT', transactionType: 'Paiment recived', debit: undefined, credit: 1, balance: 1 },
    { confirmedDate: new Date(2020, 11, 2, 14, 56), orderID: 'BXT7G8', orderCode: 'SETLMENT', transactionType: 'Paiment recived', debit: undefined, credit: 1, balance: 1 },
    { confirmedDate: new Date(2020, 11, 2, 14, 55), orderID: 'BXT7G7', orderCode: 'SETLMENT', transactionType: 'Paiment recived', debit: undefined, credit: 1, balance: 1 },
    { confirmedDate: new Date(2020, 11, 2, 14, 54), orderID: 'BXT7G6', orderCode: 'SETLMENT', transactionType: 'Paiment recived', debit: undefined, credit: 1, balance: 1 },
    { confirmedDate: new Date(2020, 11, 2, 14, 53), orderID: 'BXT7G6', orderCode: 'SETLMENT', transactionType: 'Paiment recived', debit: undefined, credit: 1, balance: 1 },
    { confirmedDate: new Date(2020, 11, 2, 14, 52), orderID: 'BXT7G6', orderCode: 'SETLMENT', transactionType: 'Paiment recived', debit: undefined, credit: 1, balance: 1 },
    { confirmedDate: new Date(2020, 11, 2, 14, 51), orderID: 'BXT7G6', orderCode: 'SETLMENT', transactionType: 'Paiment recived', debit: undefined, credit: 1, balance: 1 },
    { confirmedDate: new Date(2020, 11, 2, 14, 50), orderID: 'BXT7G6', orderCode: 'SETLMENT', transactionType: 'Paiment recived', debit: 1, credit: 1, balance: 1 },
    { confirmedDate: new Date(2020, 11, 2, 14, 49), orderID: 'BXT7G6', orderCode: 'SETLMENT', transactionType: 'Paiment recived', debit: 1, credit: 1, balance: 1 },
];

const accountDetailsMock = {
    name: 'felixAccountTest',
    category: 'Treasury account',
    balance: 1.0504,
    unconfirmedFunds: 0,
};

@Injectable()
export class AccountDetailsRepositoryMock extends AccountDetailsRepository {
    getAllTransactions(accountID: number): Observable<Transaction[]> {
        return new Observable((observer) => {
            observer.next(transactionsMocks);
            observer.complete();
        });
    }
    getAccountDetails(accountID: number): Observable<AccountDetails> {
        return new Observable((observer) => {
            observer.next(accountDetailsMock);
            observer.complete();
        });
    }
    onChangeSomeTransactionOf(accountID: number): Observable<Transaction> {
        return new Observable<Transaction>((observer) => {
            setInterval(() => {
                const randomAccount = transactionsMocks[Math.floor(Math.random() * transactionsMocks.length)];
                if (Math.floor(Math.random() * 2) === 0) {
                    randomAccount.balance = Math.floor(Math.random() * 10000);
                }
                if (Math.floor(Math.random() * 2) === 0) {
                    randomAccount.credit = Math.floor(Math.random() * 10000);
                }
                observer.next(randomAccount);
            }, Math.floor(Math.random() * 20000) + 20000);
        });
    }
}