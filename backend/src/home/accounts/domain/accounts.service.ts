import { Account } from './account.model';

export abstract class AccountsService {
  abstract findAll(): Promise<Account[]>;
}
