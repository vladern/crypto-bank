import { Injectable } from '@nestjs/common';
import { AccountsService } from '../domain/accounts.service';
import { Account } from '../domain/account.model';
import { accounts } from 'src/db/accounts';

@Injectable()
export class AccountsServiceMock extends AccountsService {
  findAll(): Promise<Account[]> {
    return Promise.resolve(accounts);
  }
}
