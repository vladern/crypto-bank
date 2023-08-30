import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutRepository } from '../domain/layout-repository';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ExchangeRateService } from '@shared/services/exchange-rate.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  public btcPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private homeRepositorySubscription: Subscription;
  constructor(
    private homeRepository: LayoutRepository,
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
