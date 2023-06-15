import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';

type RegisterGroup = {
  email: FormControl<string | null>;
  username: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
};

export const matchPassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (
    password &&
    password.value &&
    confirmPassword &&
    confirmPassword.value &&
    password?.value != confirmPassword?.value
  ) {
    return {
      passwordmatcherror: true,
    };
  }

  return null;
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup<RegisterGroup>;

  constructor() {
    this.registerForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
      },
      {
        validators: matchPassword,
      }
    );
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    // Typically, here you would send the form data to the server
    console.log('Form Value: ', this.registerForm.value);
  }
}
