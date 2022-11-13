import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CountryService } from '../../services/country/country.service';

import { FlagIconComponent } from './flag-icon.component';

@NgModule({
  declarations: [FlagIconComponent],
  imports: [CommonModule, HttpClientModule],
  providers : [CountryService],
  exports: [FlagIconComponent]
})
export class FlagIconModule {}
