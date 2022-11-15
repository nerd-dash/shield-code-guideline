import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services';
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

  constructor(private countryService: CountryService, private userService : UserService) {
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

  onSubmit(){
    this.userService.create(this.form.value).subscribe(console.log)
  }

  onCancel(){

  }

}
