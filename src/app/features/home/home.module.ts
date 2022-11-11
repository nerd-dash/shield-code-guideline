import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeShellModule } from './containers/home-shell/home-shell.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HomeRoutingModule, HomeShellModule]
})
export class HomeModule {}
