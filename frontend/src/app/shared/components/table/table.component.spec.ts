import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

// create a container component that declares the template and uses the table component
@Component({
  selector: 'app-container',
  template: `
    <app-table *ngIf="columns.length" [data]="data" [columns]="columns"></app-table>
    <ng-template #emailTemplate let-element="element" let-column="column">
      <a href="mailto:{{element[column.key]}}">{{element[column.key]}}</a>
    </ng-template>
  `
})
class ContainerComponent implements AfterViewInit {
  data = [
    {id: 1, name: 'Alice', email: 'alice@example.com'},
    {id: 2, name: 'Bob', email: 'bob@example.com'},
    {id: 3, name: 'Charlie', email: 'charlie@example.com'},
  ];
  columns = [];

  @ViewChild('emailTemplate') emailTemplate: TemplateRef<unknown>;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.columns = [
      {key: 'id', label: 'ID'},
      {key: 'name', label: 'Name'},
      {key: 'email', label: 'Email', customTemplate: this.emailTemplate}
    ];
    this.cd.detectChanges();
  }
}

// test the table component using the container component as the host
describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerComponent ],
      imports: [ MatTableModule, MatPaginatorModule, TableComponent, CommonModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(TableComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the data in a table', async () => {
    const table = fixture.nativeElement.querySelector('table');
    expect(table).toBeTruthy();
    component.ngOnInit();
    await fixture.whenStable();
    fixture.detectChanges();
    const rows = table.querySelectorAll('tr');
    expect(rows.length).toBe(4); // 3 data rows + 1 header row
    const headerCells = rows[0].querySelectorAll('th');
    expect(headerCells.length).toBe(3); // 3 columns
    expect(headerCells[0].textContent).toContain('ID');
    expect(headerCells[1].textContent).toContain('Name');
    expect(headerCells[2].textContent).toContain('Email');
    const dataCells = rows[1].querySelectorAll('td');
    expect(dataCells.length).toBe(3); // 3 columns
    expect(dataCells[0].textContent).toContain('1');
    expect(dataCells[1].textContent).toContain('Alice');

    // check that the email is displayed as a link using the custom template
    const emailLink = dataCells[2].querySelector('a');
    expect(emailLink).toBeTruthy();
    expect(emailLink.textContent).toContain('alice@example.com');
    expect(emailLink.href).toContain('mailto:alice@example.com');
  });

  it('should display a paginator', () => {
    const paginator = fixture.nativeElement.querySelector('mat-paginator');
    expect(paginator).toBeTruthy();
  });
});

