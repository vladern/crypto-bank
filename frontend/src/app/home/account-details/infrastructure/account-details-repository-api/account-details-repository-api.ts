import { Injectable } from "@angular/core";
import { AccountDetailsRepository } from "../../domain/account-details-repository";
import { HttpClient } from "@angular/common/http";
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";
import { Transaction } from "../../domain/transaction";
import { AccountDetails } from "../../domain/account-details";

@Injectable()
export class AccountDetailsRepositoryApi implements AccountDetailsRepository {
    constructor(
        private http: HttpClient,
        private socket: Socket
    ) { }

    getAllTransactions(accountID: number): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(`http://localhost:3001/account-details/${accountID}/transactions`);
    }

    getAccountDetails(accountID: number): Observable<AccountDetails> {
        return this.http.get<AccountDetails>(`http://localhost:3001/account-details/${accountID}`);
    }

    onChangeSomeTransactionOf(accountID: number): Observable<Transaction> {
        this.socket.emit('on_some_transaction_changed', accountID);
        return this.socket.fromEvent<Transaction>('transaction');
    }
}