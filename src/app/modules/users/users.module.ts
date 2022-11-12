import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UserService } from 'src/app/shared/services';
import { ErrorDialogModule } from 'src/app/shared/sfc-components';
import { UsersListModule } from 'src/app/shared/sfc-components/users-list/users-list.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    UsersRoutingModule,
    UsersListModule,
    ErrorDialogModule
  ],
  providers: [UserService],
  exports: [UsersComponent]
})
export class UsersModule {}
