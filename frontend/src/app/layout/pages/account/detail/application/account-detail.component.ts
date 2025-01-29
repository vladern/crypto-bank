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
        const accountDetailsId = this.activatedRoute.snapshot.params.id;
        this.getAccountDetails(accountDetailsId);
        this.getAllTransactions(accountDetailsId);
        this.subscribeToExchangeRateChanges();
        this.subscribeToTransactionChanges(accountDetailsId);
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

    private subscribeToTransactionChanges(accountDetailsId: number) {
        this.subscriptions.push(this.accountDetailsRepository.onChangeSomeTransactionOf(accountDetailsId).subscribe((transaction) => {
            const transactionIndex = this.data.findIndex((transactionItem) => transactionItem.orderCode === transaction.orderCode);
            if (transactionIndex !== -1) {
                this.data[transactionIndex].balance = transaction.balance;
                this.data[transactionIndex].credit = transaction.credit;
                this.cd.detectChanges();
            }
        }));
    }

    private getAccountDetails(accountDetailsId: number) {
        this.subscriptions.push(this.accountDetailsRepository.getAccountDetails(accountDetailsId).subscribe((accountDetails) => {
            this.accountDetails = accountDetails;
            this.cd.detectChanges();
        }));
    }

    private getAllTransactions(accountDetailsId: number) {
        this.subscriptions.push(this.accountDetailsRepository.getAllTransactions(accountDetailsId).subscribe((transactions) => {
            this.data = transactions;
            this.cd.detectChanges();
        }));
    }
}