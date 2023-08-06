import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeRateGateway } from './home/exchange-rate/exchange-rate.gateway';
import { AccountsModule } from './home/accounts/application/accounts.module';
import { AccountDetailsModule } from './home/account-details/application/account-details.module';

@Module({
  imports: [AccountsModule, AccountDetailsModule],
  controllers: [AppController],
  providers: [AppService, ExchangeRateGateway],
})
export class AppModule {}
