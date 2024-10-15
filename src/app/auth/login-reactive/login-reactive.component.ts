import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }

  return { doesNotContainQuestionMark: true };
}
// dummy validator function
function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'admin@example.com') {
    return of(null);
    //of() produce observable that emit a value which is null here
  }
  return of({ notUniqueEmail: true });
}

@Component({
  selector: 'app-login-reactive',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-reactive.component.html',
  styleUrl: './login-reactive.component.css',
})
export class LoginReactiveComponent {
  form = new FormGroup({
    // accept a second argument which is array of validators or configuration object which contain validatiors:[]
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      // asyncValidators are functions taht get control as arg and must return observable to do things like check value with backend data so its null if valid or error object if not
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        mustContainQuestionMark,
      ],
    }),
  });

  get invalidEmail() {
    return (
      this.form.controls.email.invalid &&
      this.form.controls.email.touched &&
      this.form.controls.email.dirty
    );
  }

  get invalidPassword() {
    return (
      this.form.controls.password.invalid &&
      this.form.controls.password.touched &&
      this.form.controls.password.dirty
    );
  }
  onSumbit() {
    console.log(this.form);
    // directly access the controls - no need to use template variables
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail);
    console.log(enteredPassword);
  }
}
