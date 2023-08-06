import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HomeRepository } from '../../domain/home-repository';
import { Observable } from 'rxjs';

@Injectable()
export class HomeRepositorySocketIO extends HomeRepository {

  constructor(private socket: Socket) {
    super();
  }

  getExchangeRate(): Observable<number> {
    return this.socket.fromEvent<number>('exchange_rate_changed');
  }
}
