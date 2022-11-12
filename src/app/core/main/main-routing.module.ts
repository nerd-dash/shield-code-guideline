import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';

const children: Routes = [
  {
    path: ``,
    redirectTo: `home`
  },
  {
    path: `home`,
    loadChildren: () =>
      import('../../modules/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: `users`,
    loadChildren: () =>
      import(`../../modules/users/users.module`).then((m) => m.UsersModule)
  }
];

const routes: Routes = [
  {
    path: ``,
    component: MainComponent,
    children
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
