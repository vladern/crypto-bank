import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class LayoutRepository {
    abstract getExchangeRate(): Observable<number>;
}