import { HttpClient } from "@angular/common/http";
import { AccountsRepository } from "../../domain/accounts-repository";
import { Observable } from "rxjs";
import { Account } from "../../domain/account";
import { Socket } from "ngx-socket-io";
import { Injectable } from "@angular/core";

@Injectable()
export class AccountsRepositoryApi implements AccountsRepository {
    constructor(
        private http: HttpClient,
        private socket: Socket
    ) { }

    getAccounts(): Observable<Account[]> {
        return this.http.get<Account[]>('http://localhost:3001/accounts');
    }

    onSomeAcountChanges(): Observable<Account> {
        return this.socket.fromEvent<Account>('on_some_account_changed')
    }
}