import { Observable } from "rxjs";
import { HomeRepository } from "../domain/home-repository";
import { Injectable } from "@angular/core";

@Injectable()
export class HomeRepositoryMock extends HomeRepository {
    public getExchangeRate(): Observable<number> {
        return new Observable<number>((observer) => {  
            observer.next(this.getRandomInteger(10000, 12000));
            setInterval(() => {
                observer.next(this.getRandomInteger(5000, 12000));
            }, 30000);
        });
    }
    private getRandomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}