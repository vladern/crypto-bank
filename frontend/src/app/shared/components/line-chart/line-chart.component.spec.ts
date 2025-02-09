import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineChartComponent } from './line-chart.component';
import * as d3 from 'd3';

describe('LineChartComponent', () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the chart when data is set', () => {
    const testData = [
      { date: new Date('2023-01-01'), price: 100 },
      { date: new Date('2023-01-02'), price: 200 }
    ];
    component.data = testData;
    fixture.detectChanges();

    const svgElement = d3.select('#chart').select('svg').node();
    expect(svgElement).not.toBeNull();
  });

  it('should create a line path', () => {
    const testData = [
      { date: new Date('2023-01-01'), price: 100 },
      { date: new Date('2023-01-02'), price: 200 }
    ];
    component.data = testData;
    fixture.detectChanges();

    const linePath = d3.select('#chart').select('path').node();
    expect(linePath).not.toBeNull();
  });
});
