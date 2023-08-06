import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountsComponent } from './accounts.component';
import { AccountsRepository } from '../domain/accounts-repository';
import { ExchangeRateService } from '@shared/services/exchange-rate.service';
import { BehaviorSubject, of } from 'rxjs';
import { AccountRepositoryMock } from '../infraestructure/account-repository-mock';
import { TableComponent } from '@shared/components/table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BalanceTemplateComponent } from '@shared/components/balance-template/balance-template.component';
import { HighlightChangeDirective } from '@shared/directives/highlight-change-directive/highlight-change.directive';

describe('AccountsComponent', () => {
  let component: AccountsComponent;
  let fixture: ComponentFixture<AccountsComponent>;
  let accountRepository: AccountsRepository;
  let exchangeRateService: ExchangeRateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsComponent ],
      imports: [ HighlightChangeDirective, HttpClientTestingModule, TableComponent, BrowserAnimationsModule, BalanceTemplateComponent ],
      providers: [ { provide: AccountsRepository, useClass: AccountRepositoryMock }, ExchangeRateService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsComponent);
    component = fixture.componentInstance;
    accountRepository = TestBed.inject(AccountsRepository);
    exchangeRateService = TestBed.inject(ExchangeRateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get accounts from repository', () => {
    const mockAccounts = [
      { id: 12, name: 'Account 1', category: 'Personal', tags:'tag1', balance: 0.5, availableBalance: 0.4 },
      { id: 13, name: 'Account 2', category: 'Business', tags: 'tag3', balance: 1.2, availableBalance: 1.1 }
    ];
    spyOn(accountRepository, 'getAccounts').and.returnValue(of(mockAccounts));
    component.ngOnInit();
    expect(component.data).toEqual(mockAccounts);
  });

  it('should get exchange rate from service', () => {
    const mockExchangeRate = new BehaviorSubject(50000);
    spyOn(exchangeRateService, 'getExchangeRate').and.returnValue(mockExchangeRate);
    component.ngOnInit();
    expect(component.exchangeRate).toEqual(50000);
  });

  it('should set columns after view init', () => {
    component.ngAfterViewInit();
    expect(component.columns.length).toEqual(5);
    expect(component.columns[0].key).toEqual('name');
    expect(component.columns[0].label).toEqual('Account name');
    expect(component.columns[3].key).toEqual('balance');
    expect(component.columns[3].label).toEqual('Balance');
    expect(component.columns[3].customTemplate).toBeDefined();
  });
});
