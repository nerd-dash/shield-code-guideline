import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export enum UserRoutes {
  LIST = `list`,
  FORM = `form`
}

const routes: Routes = [
  {
    path: ``,
    redirectTo: UserRoutes.LIST
  },
  {
    path: UserRoutes.LIST,
    loadChildren: () =>
      import('./users-list/users-list.module').then((m) => m.UsersListModule)
  },
  {
    path: UserRoutes.FORM,
    loadChildren: () =>
      import('./user-form/user-form.module').then((m) => m.UserFormModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
