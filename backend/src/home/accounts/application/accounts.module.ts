import { Module } from '@nestjs/common';
import { AccountsService } from '../domain/accounts.service';
import { AccountsServiceMock } from '../infrastructure/accounts-mock.service';
import { AccountsController } from './accounts.controller';
import { AccountsGateway } from './accounts.gateway';

@Module({
  imports: [],
  controllers: [AccountsController],
  providers: [
    { provide: AccountsService, useClass: AccountsServiceMock },
    AccountsGateway,
  ],
})
export class AccountsModule {}
