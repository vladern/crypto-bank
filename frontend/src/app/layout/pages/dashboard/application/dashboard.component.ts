import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { LineChartComponent } from '@shared/components/line-chart/line-chart.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutes } from './dashboard.routes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LineChartComponent, CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  btcHistoryData = signal<{ date: Date; price: number }[]>([
    { date: new Date('2023-01-01'), price: 100 },
    { date: new Date('2023-01-02'), price: 200 },
    // Add more data as needed
  ]);
}
