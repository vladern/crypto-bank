import { Test } from '@nestjs/testing';
import { AccountsGateway } from './accounts.gateway';
import { AccountsService } from '../domain/accounts.service';
import { Server } from 'socket.io';
import { Account } from '../domain/account.model';

class AccountsServiceMock {
  findAll(): Promise<Account[]> {
    const accounts: Account[] = [
      {
        id: 1,
        name: 'Testing account',
        category: 'affiliates',
        tags: 'Test',
        balance: 0,
        availableBalance: 0,
      },
    ];
    return Promise.resolve(accounts);
  }
}

describe('AccountsGateway', () => {
  let accountsGateway: AccountsGateway;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AccountsGateway,
        { provide: AccountsService, useClass: AccountsServiceMock },
      ],
    }).compile();

    accountsGateway = moduleRef.get<AccountsGateway>(AccountsGateway);
    accountsGateway.server = new Server();
    accountsGateway.timeout = 500;
  });

  afterEach(() => {
    clearInterval(accountsGateway.timeInterval);
  });

  it('should be defined', () => {
    expect(accountsGateway).toBeDefined();
  });

  it('should emit account changes', (done) => {
    accountsGateway.server.emit = jest.fn();
    const emitSpy = jest.spyOn(accountsGateway.server, 'emit');
    accountsGateway.afterInit();
    setTimeout(() => {
      expect(emitSpy).toHaveBeenCalledWith(
        'on_some_account_changed',
        expect.any(Object),
      );
      done();
    }, 1000);
  });
});
