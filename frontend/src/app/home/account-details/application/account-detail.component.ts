import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TableColumn } from '@shared/components/table/table.component';
import { Subscription } from 'rxjs';
import { ExchangeRateService } from '@shared/services/exchange-rate.service';
import { ActivatedRoute } from '@angular/router';
import { AccountDetailsRepository } from '../domain/account-details-repository';
import { AccountDetails } from '../domain/account-details';
import { Transaction } from '../domain/transaction';

@Component({
    selector: 'app-account-details',
    templateUrl: './account-detail.component.html',
    styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
    public data: Transaction[] = [];
    public accountDetails: AccountDetails;
    public columns: TableColumn[] = [];
    public exchangeRate = 0;
    private accountDetailsId: number;
    private subscriptions: Subscription[] = [];
    @ViewChild('btcTemplate') btcTemplate: TemplateRef<unknown>;
    @ViewChild('dateTime') dateTimeTemplate: TemplateRef<unknown>;

    constructor(
        private cd: ChangeDetectorRef,
        private exchangeRateService: ExchangeRateService,
        private activatedRoute: ActivatedRoute,
        private accountDetailsRepository: AccountDetailsRepository,
    ) { }

    ngOnInit(): void {
        this.accountDetailsId = this.activatedRoute.snapshot.params.id;
        this.getAccountDetails();
        this.getAllTransactions();
        this.subscribeToExchangeRateChanges();
        this.subscribeToTransactionChanges();
    }

    ngAfterViewInit() {
        this.setColumns();
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    private setColumns() {
        this.columns = [
            { key: 'confirmedDate', label: 'Confirmed date', customTemplate: this.dateTimeTemplate },
            { key: 'orderID', label: 'Order ID' },
            { key: 'orderCode', label: 'Order code' },
            { key: 'transactionType', label: 'Transaction type' },
            { key: 'debit', label: 'Debit', customTemplate: this.btcTemplate },
            { key: 'credit', label: 'Credit', customTemplate: this.btcTemplate },
            { key: 'balance', label: 'Balance', customTemplate: this.btcTemplate },
        ];
        this.cd.detectChanges();
    }

    private subscribeToExchangeRateChanges() {
        this.subscriptions.push(this.exchangeRateService.getExchangeRate().subscribe((exchangeRate) => {
            this.exchangeRate = exchangeRate;
            this.cd.detectChanges();
        }));
    }

    private subscribeToTransactionChanges() {
        this.subscriptions.push(this.accountDetailsRepository.onChangeSomeTransactionOf(this.accountDetailsId).subscribe((transaction) => {
            this.data.push(transaction);
            this.cd.detectChanges();
        }));
    }

    private getAccountDetails() {
        this.subscriptions.push(this.accountDetailsRepository.getAccountDetails(this.accountDetailsId).subscribe((accountDetails) => {
            this.accountDetails = accountDetails;
            this.cd.detectChanges();
        }));
    }

    private getAllTransactions() {
        this.subscriptions.push(this.accountDetailsRepository.getAllTransaction(this.accountDetailsId).subscribe((transactions) => {
            this.data = transactions;
            this.cd.detectChanges();
        }));
    }
}