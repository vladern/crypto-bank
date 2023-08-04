import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeRateGateway } from './exchange-rate/exchange-rate.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ExchangeRateGateway],
})
export class AppModule {}
