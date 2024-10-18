import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';

function isEmailUnique(control: AbstractControl) {
  if (control.value !== 'admin@example.com') {
    return of(null);
  }
  return of({ notUnique: true });
}

function mustContainAtChar(control: AbstractControl) {
  if (control.value.includes('@')) return of(null);

  return of({ containAtChar: false });
}

let initialEmailValue = '';
const savedItems = window.localStorage.getItem('saved-login');
if (savedItems) {
  const loadedItems = JSON.parse(savedItems);
  initialEmailValue = loadedItems.email;
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
      asyncValidators: [isEmailUnique],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      asyncValidators: [mustContainAtChar],
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      asyncValidators: [mustContainAtChar],
    }),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    street: new FormControl('', { validators: [Validators.required] }),
    number: new FormControl('', { validators: [Validators.required] }),
    postalCode: new FormControl('', { validators: [Validators.required] }),
    city: new FormControl('', { validators: [Validators.required] }),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', { validators: [Validators.required] }), //dropdown list
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
    console.log(this.form);
  }

  onReset() {
    this.form.reset();
  }
}
