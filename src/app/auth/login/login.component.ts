import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
})
export class LoginComponent {
  // access the form by viewChild method decorator or viewChild signal method or ngSubmit(form)
  // @ViewChild(HTMLFormElement) form?: ElementRef<HTMLFormElement>;
  // private form = viewChild<ElementRef<HTMLFormElement>>('form');

  onSubmit(formDate: NgForm) {
    // validation
    if (formDate.form.invalid) {
      return;
    }
    const enteredEmail = formDate.form.value.email;
    const enteredPassword = formDate.form.value.password;
    console.log(formDate);
    console.log(enteredEmail, enteredPassword);

    // reset all enternally managed info about form like the ngModel classes added
    formDate.form.reset();
  }
}
