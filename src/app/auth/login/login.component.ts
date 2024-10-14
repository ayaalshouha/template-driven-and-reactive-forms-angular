import { NotExpr } from '@angular/compiler';
import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { subscribeOn } from 'rxjs';

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
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    //register a func should be executed once after this component being rendered for the first time
    afterNextRender(() => {
      //(valueChanges) observable omit value whenever value entered to the form changes
      const subscription = this.form().valueChanges?.subscribe({
        next: (val) => {
          console.log(val);
        },
      });

      this.destroyRef.onDestroy(() => {
        subscription?.unsubscribe();
      });
    });
  }

  onSubmit(formDate: NgForm) {
    // validation
    if (formDate.form.invalid) {
      return;
    }
    const enteredEmail = formDate.form.value.email;
    const enteredPassword = formDate.form.value.password;
    console.log(formDate);
    console.log(enteredEmail, enteredPassword);

    // reset all enternally managed info about form like the ngModel classes that added
    formDate.form.reset();
  }
}
