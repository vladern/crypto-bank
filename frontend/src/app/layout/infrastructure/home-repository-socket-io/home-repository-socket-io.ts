import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LayoutRepository } from '../../domain/layout-repository';
import { Observable } from 'rxjs';

@Injectable()
export class HomeRepositorySocketIO extends LayoutRepository {

  constructor(private socket: Socket) {
    super();
  }

  getExchangeRate(): Observable<number> {
    return this.socket.fromEvent<number>('exchange_rate_changed');
  }
}
