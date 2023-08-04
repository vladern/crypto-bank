import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ExchangeRateService {
    private exchangeRate: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    constructor() { }
    setExchangeRate(exchangeRate: number): void {
        this.exchangeRate.next(exchangeRate);
    }
    getExchangeRate(): BehaviorSubject<number> {
        return this.exchangeRate;
    }
}