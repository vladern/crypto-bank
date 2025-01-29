import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';
import { HighlightChangeDirective } from '@shared/directives/highlight-change-directive/highlight-change.directive';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, HighlightChangeDirective]
})
export class HeaderComponent {
    @Input() btcPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    constructor() { }
}
