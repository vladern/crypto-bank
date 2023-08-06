import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TableColumn } from '@shared/components/table/table.component';
import { AccountsRepository } from '../domain/accounts-repository';
import { Subscription } from 'rxjs';
import { ExchangeRateService } from '@shared/services/exchange-rate.service';
import { Account } from '../domain/account';
import { Router } from '@angular/router';

@Component({
    selector: 'app-acounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, AfterViewInit, OnDestroy {
    data: Account[] = [];
    columns: TableColumn[] = [];
    exchangeRate = 0;
    private subscriptions: Subscription[] = [];
    @ViewChild('btcTemplate') btcTemplate: TemplateRef<unknown>;

    constructor(
        private cd: ChangeDetectorRef,
        private router: Router,
        private accountsRepository: AccountsRepository,
        private exchangeRateService: ExchangeRateService,
    ) { }

    ngOnInit(): void {
        this.getAllAccounts();
        this.subscribeToAccountChanges();
        this.subscribeToExchangeRateChanges();
    }

    ngAfterViewInit() {
        this.setColumns();
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    public onRowClicked(row: Account) {
        this.router.navigate(['home/accounts/detail', row.id]);
    }

    private setColumns() {
        this.columns = [
            { key: 'name', label: 'Account name' },
            { key: 'category', label: 'Category' },
            { key: 'tags', label: 'Tags' },
            { key: 'balance', label: 'Balance', customTemplate: this.btcTemplate },
            { key: 'availableBalance', label: 'Available balance', customTemplate: this.btcTemplate },
        ];
        this.cd.detectChanges();
    }

    private getAllAccounts() {
        this.subscriptions.push(this.accountsRepository.getAccounts().subscribe((accounts) => {
            this.data = accounts;
            this.cd.detectChanges();
        }));
    }

    private subscribeToAccountChanges() {
        this.subscriptions.push(this.accountsRepository.onSomeAcountChanges().subscribe((account) => {
            const index = this.data.findIndex((data) => data.id === account.id);
            if (index !== -1) {
                this.data[index] = account;
                this.cd.detectChanges();
            }
        }));
    }

    private subscribeToExchangeRateChanges() {
        this.subscriptions.push(this.exchangeRateService.getExchangeRate().subscribe((exchangeRate) => {
            this.exchangeRate = exchangeRate;
            this.cd.detectChanges();
        }));
    }
}