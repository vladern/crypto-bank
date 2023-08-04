import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Account } from './account';

@Injectable()
export abstract class AccountRepository {
    abstract getAccounts(): Observable<Account[]>;
    abstract onSomeAcountChanges(): Observable<Account>;
}