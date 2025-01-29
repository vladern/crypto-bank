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
    this.socket.emit('subscribe', { streams: ['btcusdt@trade'] });
    return new Observable((observer) => {
      this.socket.on('btcusdt@trade', ({ p: price }: { p: string; }) => {
        observer.next(parseFloat(price));
      });
    });
  }
}
