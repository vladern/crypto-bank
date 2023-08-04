import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HomeRepository } from '../domain/home-repository';
import { Observable, map } from 'rxjs';

interface ExchangeRateEventResponse {
  exchangeRate: number;
}

@Injectable()
export class HomeRepositoryImpl extends HomeRepository {

  constructor(private socket: Socket) {
    super();
  }

  getExchangeRate(): Observable<number> {
    return this.socket.fromEvent<number>('exchange_rate_changed');
  }
}
