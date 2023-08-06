import { Injectable } from '@nestjs/common';
import { AccountsService } from '../domain/accounts.service';
import { Account } from '../domain/account.model';

const accounts: Account[] = [
  {
    id: 1,
    name: 'Testing account',
    category: 'affiliates',
    tags: 'Test',
    balance: 0,
    availableBalance: 0,
  },
  {
    id: 2,
    name: 'Test_account_01',
    category: 'affiliates',
    tags: '',
    balance: 0,
    availableBalance: 0,
  },
  {
    id: 3,
    name: 'david.test.account.01',
    category: 'Affiliates',
    tags: 'test',
    balance: 33.37751972,
    availableBalance: 23.14955396,
  },
  {
    id: 4,
    name: 'david.test.account.02',
    category: 'Affiliates',
    tags: '',
    balance: 0,
    availableBalance: 0,
  },
  {
    id: 5,
    name: 'david.test.account.03',
    category: 'Affiliates',
    tags: '',
    balance: 0,
    availableBalance: 0,
  },
  {
    id: 6,
    name: 'david.test.account.04',
    category: 'Affiliates',
    tags: '',
    balance: 0,
    availableBalance: 0,
  },
  {
    id: 7,
    name: 'david.test.account.05',
    category: 'Affiliates',
    tags: '',
    balance: 0,
    availableBalance: 0,
  },
  {
    id: 8,
    name: 'david.test.account.06',
    category: 'Affiliates',
    tags: '',
    balance: 0,
    availableBalance: 0,
  },
  {
    id: 9,
    name: 'david.test.account.07',
    category: 'Affiliates',
    tags: '',
    balance: 0,
    availableBalance: 0,
  },
  {
    id: 10,
    name: 'david.test.account.08',
    category: 'Affiliates',
    tags: '',
    balance: 0,
    availableBalance: 0,
  },
  {
    id: 11,
    name: 'david.test.account.09',
    category: 'Affiliates',
    tags: '',
    balance: 0,
    availableBalance: 0,
  },
  {
    id: 12,
    name: 'david.test.account.10',
    category: 'Affiliates',
    tags: '',
    balance: 0,
    availableBalance: 0,
  },
  {
    id: 13,
    name: 'david.test.account.11',
    category: 'Affiliates',
    tags: '',
    balance: 0,
    availableBalance: 0,
  },
  {
    id: 14,
    name: 'david.test.account.12',
    category: 'Affiliates',
    tags: '',
    balance: 0,
    availableBalance: 0,
  },
  {
    id: 15,
    name: 'david.test.account.13',
    category: 'Affiliates',
    tags: '',
    balance: 0,
    availableBalance: 0,
  },
];

@Injectable()
export class AccountsServiceMock extends AccountsService {
  findAll(): Promise<Account[]> {
    return Promise.resolve(accounts);
  }
}
