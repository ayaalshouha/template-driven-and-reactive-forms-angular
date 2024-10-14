import { NotExpr } from '@angular/compiler';
import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

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
    const savedForm = window.localStorage.getItem('saved-login-form');
    if (savedForm) {
      const loadedFormData = JSON.parse(savedForm);
      const savedEmail = loadedFormData.email;
      const savedPassword = loadedFormData.password;

      //setTimeout() so the form is fully initialized and DOM can recognize the controls and setValues function well
      setTimeout(() => {
        // this.form().setValue({ email: savedEmail, password: savedPassword });
        this.form().controls['email'].setValue(savedEmail);
        this.form().controls['password'].setValue(savedPassword);
      }, 1);
    }

    //register a func should be executed once after this component being rendered for the first time
    afterNextRender(() => {
      //(valueChanges) observable omit value whenever value entered to the form changes
      const subscription = this.form()
        .valueChanges?.pipe(
          // discard the latest value emittied if there is a value emitted within the time selected 500ms
          debounceTime(500)
        )
        .subscribe({
          next: (value) => {
            window.localStorage.setItem(
              'saved-login-form',
              // local storage only accept string values so JSON.stringify() is used
              JSON.stringify({
                email: value.email,
                password: value.password,
              })
            );
          },
        });

      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
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
