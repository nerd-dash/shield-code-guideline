import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Country } from '../../models/County';
import { CountryService } from '../../services/country/country.service';

@Component({
  selector: 'sfc-flag-icon',
  templateUrl: './flag-icon.component.html',
  styleUrls: ['./flag-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlagIconComponent {
  @Input() set country(value: string) {
    this.country$ = this.countryService.getByCode(value);
  }

  country$: Observable<Country> = of();

  constructor(private countryService: CountryService) {}
}
