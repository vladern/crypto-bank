import { Test, TestingModule } from '@nestjs/testing';
import { AccountDetailsGateway } from './account-details.gateway';
import { AccountDetailsService } from '../domain/account-detail.service';
import { Server, Socket } from 'socket.io';
import { AccountDetailsMockService } from '../infrastructure/account-details-mock.service';

describe('AccountDetailsGateway', () => {
  let gateway: AccountDetailsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountDetailsGateway,
        { provide: AccountDetailsService, useClass: AccountDetailsMockService },
      ],
    }).compile();

    gateway = module.get<AccountDetailsGateway>(AccountDetailsGateway);
    gateway.server = new Server();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should handle transaction change', () => {
    const client = { join: jest.fn() } as unknown as Socket;
    const accountID = 1;
    const room = `transaction-${accountID}`;
    jest.spyOn(gateway.server, 'emit');

    gateway.handleTransactionChange(client, accountID);

    expect(client.join).toHaveBeenCalledWith(room);
  });
});
