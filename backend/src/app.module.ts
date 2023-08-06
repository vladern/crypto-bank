import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeRateGateway } from './home/exchange-rate/exchange-rate.gateway';
import { AccountsController } from './home/accounts/aplication/accounts/accounts.controller';

@Module({
  imports: [],
  controllers: [AppController, AccountsController],
  providers: [AppService, ExchangeRateGateway],
})
export class AppModule {}
