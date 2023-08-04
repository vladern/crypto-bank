import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BalanceTemplateComponent } from './balance-template.component';

describe('BalanceTemplateComponent', () => {
  let component: BalanceTemplateComponent;
  let fixture: ComponentFixture<BalanceTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BalanceTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the balance in the given currency', () => {
    component.balance = 1;
    component.currency = 'BTC';
    fixture.detectChanges();
    const balanceElement = fixture.nativeElement.querySelector('.balance-template div:first-child');
    expect(balanceElement.textContent).toBe('BTC1.00000000');
  });

  it('should display the balance in the exchange currency', () => {
    component.balance = 100;
    component.currency = 'EUR';
    component.exchangeRate = 1.2;
    component.exchangeCurrency = 'USD';
    fixture.detectChanges();
    const exchangeElement = fixture.nativeElement.querySelector('.balance-template div:last-child');
    expect(exchangeElement.textContent).toBe('$120.00');
  });
});
