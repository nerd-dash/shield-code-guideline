import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardModule } from '../../components/dashboard/dashboard.module';
import { NavigationModule } from '../../components/navigation/navigation.module';
import { HomeShellRoutingModule } from './home-shell-routing.module';
import { HomeShellComponent } from './home-shell.component';

@NgModule({
  declarations: [HomeShellComponent],
  imports: [
    CommonModule,
    HomeShellRoutingModule,
    DashboardModule,
    NavigationModule
  ],
  exports: [HomeShellComponent]
})
export class HomeShellModule {}
