import { BehaviorSubject, of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from '@shared/components/table/table.component';
import { ExchangeRateService } from '@shared/services/exchange-rate.service';
import { BalanceTemplateComponent } from '@shared/components/balance-template/balance-template.component';
import { HighlightChangeDirective } from '@shared/directives/highlight-change-directive/highlight-change.directive';
import { AccountDetailsComponent } from './account-detail.component';
import { AccountDetailsRepository } from '../domain/account-details-repository';
const mockTransaction = {
    confirmedDate: new Date(),
    orderID: '789',
    orderCode: 'GHI',
    transactionType: 'Deposit',
    debit: 0,
    credit: 0.3,
    balance: 0.4
};
const mockAccountDetails = {
    name: 'Test',
    category: 'Personal',
    balance: 0.5,
    unconfirmedFunds: 0.1
};
const mockTransactions = [
    {
        confirmedDate: new Date(),
        orderID: '123',
        orderCode: 'ABC',
        transactionType: 'Deposit',
        debit: 0,
        credit: 0.2,
        balance: 0.2
    },
    {
        confirmedDate: new Date(),
        orderID: '456',
        orderCode: 'DEF',
        transactionType: 'Withdrawal',
        debit: 0.1,
        credit: 0,
        balance: 0.1
    }
];
const mockExchangeRate = new BehaviorSubject(50000);
describe('AccountDetailsComponent', () => {
    let component: AccountDetailsComponent;
    let fixture: ComponentFixture<AccountDetailsComponent>;
    let exchangeRateService: ExchangeRateService;
    let accountDetailsRepository: AccountDetailsRepository;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccountDetailsComponent],
            imports: [
                CommonModule,
                TableComponent,
                BalanceTemplateComponent,
                HighlightChangeDirective,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: ExchangeRateService, useValue: { getExchangeRate: ()=> mockExchangeRate } },
                { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1 } } } },
                { provide: AccountDetailsRepository, useValue: {
                    onChangeSomeTransactionOf: ()=> of(mockTransaction),
                    getAccountDetails: ()=> of(mockAccountDetails),
                    getAllTransactions: ()=> of(mockTransactions)
                } }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountDetailsComponent);
        component = fixture.componentInstance;
        exchangeRateService = TestBed.inject(ExchangeRateService);
        accountDetailsRepository = TestBed.inject(AccountDetailsRepository);
        fixture.detectChanges();
    });

    it('should load data on init', () => {
        spyOn(accountDetailsRepository, 'getAccountDetails').and.returnValue(of(mockAccountDetails));
        component.ngOnInit();
        component.ngAfterViewInit();
        fixture.detectChanges();
        expect(component.accountDetails).toEqual(mockAccountDetails);
        expect(component.data).toEqual(mockTransactions);
    });
});
