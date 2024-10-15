import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  get isEmailVlaid() {
    return (
      this.form.controls.email.valid &&
      !this.form.controls.email.touched &&
      !this.form.controls.email.dirty
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
