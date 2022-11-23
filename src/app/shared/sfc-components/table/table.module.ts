import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FlagIconModule } from '../flag-icon/flag-icon.module';
import { TableComponent } from './table.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    FlagIconModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  declarations: [TableComponent],
  exports: [TableComponent]
})
export class TableModule {}
