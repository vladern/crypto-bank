import { Module } from '@nestjs/common';
import { AccountDetailsService } from '../domain/account-detail.service';
import { AccountDetailsMockService } from '../infrastructure/account-details-mock.service';
import { AccountDetailsController } from './account-details.controller';
import { AccountDetailsGateway } from './account-details.gateway';

@Module({
  imports: [],
  controllers: [AccountDetailsController],
  providers: [
    AccountDetailsGateway,
    { provide: AccountDetailsService, useClass: AccountDetailsMockService}
  ],
})
export class AccountDetailsModule {}
