import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ProgressSpinnerModule } from '../progress-spinner/progress-spinner.module';
import { UsersListComponent } from './users-list.component';

@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,

    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    ProgressSpinnerModule
  ],
  exports: [UsersListComponent]
})
export class UsersListModule {}
