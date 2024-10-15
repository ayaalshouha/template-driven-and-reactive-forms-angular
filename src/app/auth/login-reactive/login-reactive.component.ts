import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-reactive',
  standalone: true,
  imports: [],
  templateUrl: './login-reactive.component.html',
  styleUrl: './login-reactive.component.css',
})
export class LoginReactiveComponent {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSumbit(){
    //accessing form control values
    //this.form.value.email;
  }
}
