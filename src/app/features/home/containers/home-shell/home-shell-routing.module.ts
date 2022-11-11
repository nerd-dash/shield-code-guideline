import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { HomeShellComponent } from './home-shell.component';

const children: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];
const routes: Routes = [
  {
    path: '',
    component: HomeShellComponent,
    children
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeShellRoutingModule {}
