import { Controller, Get, Param } from '@nestjs/common';
import { AccountDetailsService } from '../domain/account-detail.service';

@Controller('account-details')
export class AccountDetailsController {
  constructor(private readonly accountDetailsService: AccountDetailsService) {}

  @Get(':accountId')
  getAccountDetails(@Param('accountId') accountId: string) {
    return this.accountDetailsService.getAccountDetails(Number(accountId));
  }

  @Get(':accountId/transactions')
  getTransactions(@Param('accountId') accountId: number) {
    return this.accountDetailsService.getAccountDetailsTransactions(
      Number(accountId),
    );
  }
}
