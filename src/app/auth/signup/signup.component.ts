import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';

let initialEmailValue = '';
const savedItems = window.localStorage.getItem('saved-login');
if (savedItems) {
  const loadedItems = JSON.parse(savedItems);
  initialEmailValue = loadedItems.email;
}
function confirmPasswords(control: AbstractControl) {
  const pass = control.get('password')?.value;
  const confirmPass = control.get('confirmPassword')?.value;
  if (pass === confirmPass) {
    return of(null);
  }
  return of({
    confirmedPasswords: false,
  });
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.email, Validators.required],
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      { validators: [confirmPasswords] }
    ),

    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
    }),

    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', { validators: [Validators.required] }), //dropdown list
    source: new FormArray([
      //3 options
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, { validators: [Validators.required] }), //checkbox
  });

  get InvalidEmail() {
    return (
      this.form.controls['email'].invalid &&
      this.form.controls['email'].touched &&
      this.form.controls['email'].dirty
    );
  }
  onSubmit() {
    if (this.form.invalid) {
      console.log('Invaild form');
      return;
    }
  }

  onReset() {
    this.form.reset();
  }
}
