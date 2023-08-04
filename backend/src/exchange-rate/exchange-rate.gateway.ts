import {
  OnGatewayInit,
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

const EXCHANGE_RATE_TIME_INTERVAL_REFRESH = 30000;

@WebSocketGateway(81, {
  cors: { origin: '*' },
})
export class ExchangeRateGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer() server: Server;

  afterInit() {
    this.initExchangeRateEmitter();
  }

  handleConnection(client: any) {
    client.emit('exchange_rate_changed', this.getRandomNumber(5000, 10000));
  }

  private initExchangeRateEmitter() {
    setInterval(() => {
      if (this.server) {
        this.server.emit(
          'exchange_rate_changed',
          this.getRandomNumber(5000, 10000),
        );
      }
    }, EXCHANGE_RATE_TIME_INTERVAL_REFRESH);
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
