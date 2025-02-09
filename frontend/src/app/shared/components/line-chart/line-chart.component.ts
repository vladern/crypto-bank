import { Component, Input, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  @Input() set data(value: { date: Date; price: number }[]) {
    this.dataSignal.set(value);
  }

  private svg: any;
  private margin = { top: 20, right: 30, bottom: 30, left: 40 };
  private width = 800 - this.margin.left - this.margin.right;
  private height = 400 - this.margin.top - this.margin.bottom;

  // Define a signal for the data
  dataSignal = signal<{ date: Date; price: number }[]>([]);

  constructor() {
    effect(() => {
      const data = this.dataSignal();
      if (data.length > 0) {
        this.createChart(data);
      }
    });
  }

  private createChart(data: { date: Date; price: number }[]): void {
    d3.select('#chart').selectAll('*').remove();

    this.svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, this.width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.price) as number])
      .nice()
      .range([this.height, 0]);

    const line = d3
      .line<{ date: Date; price: number }>()
      .x((d) => x(d.date))
      .y((d) => y(d.price));

    this.svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    this.svg
      .append('g')
      .attr('transform', `translate(0,${this.height})`)
      .call(d3.axisBottom(x));

    this.svg.append('g').call(d3.axisLeft(y));
  }
}
