import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-balance-template',
    templateUrl: './balance-template.component.html',
    styleUrls: ['./balance-template.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class BalanceTemplateComponent {
    @Input() balance: number;
    @Input() currency: string;
    @Input() exchangeRate: number;
    @Input() exchangeCurrency: 'USD' | 'EUR' | 'GBP';
    constructor() { }
}