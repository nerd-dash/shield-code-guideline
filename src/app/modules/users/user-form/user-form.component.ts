import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'sfc-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstName: new FormControl(``),
    lastName: new FormControl(``),
    email: new FormControl(``),
    gender: new FormControl(``),
    country: new FormControl(``)
  });

  constructor() {}

  ngOnInit(): void {}
}
