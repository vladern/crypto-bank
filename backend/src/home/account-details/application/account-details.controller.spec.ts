import { Test, TestingModule } from '@nestjs/testing';
import { AccountDetailsController } from './account-details.controller';
import { AccountDetailsService } from '../domain/account-detail.service';
import { AccountDetailsMockService } from '../infrastructure/account-details-mock.service';

describe('AccountDetailsController', () => {
  let controller: AccountDetailsController;
  let service: AccountDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountDetailsController],
      providers: [
        { provide: AccountDetailsService, useClass: AccountDetailsMockService },
      ],
    }).compile();

    controller = module.get<AccountDetailsController>(AccountDetailsController);
    service = module.get<AccountDetailsService>(AccountDetailsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get account details by id', async () => {
    const accountId = '1';
    const accountDetails = {
      name: 'Alior Bank',
      category: 'bank',
      balance: 1,
      unconfirmedFunds: 1,
    };
    jest.spyOn(service, 'getAccountDetails').mockResolvedValue(accountDetails);

    const result = await controller.getAccountDetails(accountId);

    expect(result).toEqual(accountDetails);
    expect(service.getAccountDetails).toHaveBeenCalledWith(Number(accountId));
  });
});
