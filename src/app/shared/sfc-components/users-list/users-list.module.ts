import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FlagIconModule } from '../flag-icon/flag-icon.module';
import { ProgressSpinnerModule } from '../progress-spinner/progress-spinner.module';
import { UsersListComponent } from './users-list.component';

@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,

    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    ProgressSpinnerModule,
    MatIconModule,
    FlagIconModule
  ],
  exports: [UsersListComponent]
})
export class UsersListModule {}
