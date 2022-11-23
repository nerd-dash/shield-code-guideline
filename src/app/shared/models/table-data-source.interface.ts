import { TableDataProps } from './table-data-props.enum';

export interface TableDataSource extends Partial<Record<TableDataProps, any>> {
  [key: string]: any;
}
