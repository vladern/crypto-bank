import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRateGateway } from './exchange-rate.gateway';
import * as socketIOClient from 'socket.io-client';

describe('ExchangeRateGateway', () => {
  let gateway: ExchangeRateGateway;
  let client: socketIOClient.Socket;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [ExchangeRateGateway],
    }).compile();

    gateway = app.get<ExchangeRateGateway>(ExchangeRateGateway);
    client = socketIOClient.io('http://localhost:81');
    client.connect();
  });

  afterAll((done) => {
    client.disconnect();
    done();
  });

  it('should emit exchange_rate_changed event with a random number', (done) => {
    const spy = jest.spyOn(client, 'emit');
    gateway.afterInit();
    gateway.handleConnection(client);
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith(
        'exchange_rate_changed',
        expect.any(Number),
      );
      done();
    }, 1000);
  });
});
