import { Injectable } from '@angular/core';
import { LayoutRepository } from '../../domain/layout-repository';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class LayoutRepositoryWebsocket extends LayoutRepository {

    constructor() {
        super();
    }

    getExchangeRate(): Observable<number> {
        return new Observable<number>(observer => {
            const binanceWS = new WebSocket(environment.binanceWSURL);
            binanceWS.onmessage = (event) => {
                const data = JSON.parse(event.data);
                observer.next(parseFloat(data.p));
            };
            return () => binanceWS.close();
        });
    }
}
