import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './table.component';

@NgModule({
  imports: [CommonModule, MatTableModule, MatCheckboxModule],
  declarations: [TableComponent],
  exports: [TableComponent]
})
export class TableModule {}
