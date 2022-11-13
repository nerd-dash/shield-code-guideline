import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from 'src/app/shared/services';
import {
  ErrorDialogModule,
  ProgressSpinnerModule
} from 'src/app/shared/sfc-components';
import { FlagIconModule } from 'src/app/shared/sfc-components/flag-icon/flag-icon.module';

import { UsersListRoutingModule } from './users-list-routing.module';
import { UsersListComponent } from './users-list.component';

@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    UsersListRoutingModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    ProgressSpinnerModule,
    MatIconModule,
    FlagIconModule,
    MatButtonModule,
    ErrorDialogModule
  ],
  providers: [UserService],
  exports: [UsersListComponent]
})
export class UsersListModule {}
