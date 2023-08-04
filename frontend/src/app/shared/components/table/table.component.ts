import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from "@angular/core";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";

export interface TableColumn {
    key: string;
    label: string;
    customTemplate?: TemplateRef<unknown>;
}

@Component({
    selector: 'app-table',
    styleUrls: ['table.component.scss'],
    templateUrl: 'table.component.html',
    standalone: true,
    imports: [MatTableModule, MatPaginatorModule, CommonModule],
})
export class TableComponent implements OnInit, AfterViewInit {
    @Input() data: unknown[] = [];
    @Input() columns: TableColumn[] = [];
    @Input() rowIsClickable = false;
    @Output() rowClicked = new EventEmitter<unknown>();
    displayedColumns: string[] = [];
    dataSource = new MatTableDataSource(this.data);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {
        this.displayedColumns = this.columns.map(column => column.key);
        this.dataSource = new MatTableDataSource(this.data);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    onRowClicked(row: unknown) {
        this.rowClicked.emit(row);
    }
}
