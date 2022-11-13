import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'sfc-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    
    this.form = this.formBuilder.group({
      firstName: [null],
      lastName: [null],
      email: [null],
      gender: [null],
      country: [null]
    });
  }

  ngOnInit(): void {}
}
