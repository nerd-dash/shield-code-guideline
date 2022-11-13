import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CountryService } from 'src/app/shared/services/country/country.service';

@Component({
  selector: 'sfc-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  form: FormGroup = new FormGroup({
    firstName: new FormControl(``),
    lastName: new FormControl(``),
    email: new FormControl(``),
    gender: new FormControl(``),
    country: new FormControl(``)
  });

  countyOptions = [{ value: ``, label: `` }];

  constructor(private countryService: CountryService) {
    this.countryService
      .getAll()
      .pipe(first())
      .subscribe((countries) => {
        this.countyOptions = countries.map(({ name, alpha2Code }) => ({
          value: alpha2Code,
          label: name
        }));
      });
  }
}
