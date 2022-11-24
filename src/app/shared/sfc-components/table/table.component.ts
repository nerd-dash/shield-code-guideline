import { TemplateParseError } from '@angular/compiler';
import {
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { TableDataProps } from '../../models/table-data-props.enum';
import { TableDataSource } from '../../models/table-data-source.interface';

@Component({
  selector: 'sfc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() set data(values: TableDataSource[]) {
    const columnNames = Object.keys(
      values.find((value: TableDataSource) => !!value) || {}
    );
    this.displayedColumns = columnNames;
    this._dataSource.data = values;
  }

  @Input() displayedColumns: string[] = [];

  @Output() tableComponentEvent = new EventEmitter<TableDataSource>();

  @ContentChild('headers') headers!: TemplateRef<any>;
  @ContentChild('cells') cells!: TemplateRef<any>;

  _dataSource: MatTableDataSource<TableDataSource> =
    new MatTableDataSource<TableDataSource>();

  TableDataProps = TableDataProps;

  _selectIdChanged(event: MatCheckboxChange, value: TableDataSource) {
    value = { ...value, checked: event.checked };
    this.tableComponentEvent.next(value);
  }
}
