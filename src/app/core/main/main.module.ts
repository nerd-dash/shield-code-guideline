import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavigationModule } from '../navigation';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';


@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, NavigationModule],
  exports: [MainComponent]
})
export class MainModule {}
