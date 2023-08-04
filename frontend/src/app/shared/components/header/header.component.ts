import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule]
})
export class HeaderComponent {
    @Input() btcPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    constructor() { }
}
