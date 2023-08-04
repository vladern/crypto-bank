import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeRepository } from '../domain/home-repository';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ExchangeRateService } from '@shared/services/exchange-rate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public btcPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private homeRepositorySubscription: Subscription;
  constructor(
    private homeRepository: HomeRepository,
    private exchangeRateService: ExchangeRateService,
  ) { }

  ngOnInit(): void {
    this.homeRepositorySubscription = this.homeRepository
      .getExchangeRate().subscribe((btcPrice: number) => {
        this.btcPrice.next(btcPrice);
        this.exchangeRateService.setExchangeRate(btcPrice);
      });
  }

  ngOnDestroy(): void {
    this.homeRepositorySubscription?.unsubscribe();
  }
}
