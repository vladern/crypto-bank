import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class HomeRepository {
    abstract getExchangeRate(): Observable<number>;
}