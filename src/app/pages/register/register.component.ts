import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PocketbaseError } from '../../core/types/models'
import { ErrorMessageComponent } from '../../core/components/error-message/error-message.component';
import { UserRegisterPayload, UserService } from '../../core/services/user.service';

type RegisterGroup = {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  username: FormControl<string | null>;
  password: FormControl<string | null>;
  passwordConfirm: FormControl<string | null>;
};

export function extractErrorMessages(data: PocketbaseError['data']): string[] {
  return Object.values(data).map(error => error.message);
}

export const matchPassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');

  if (
    password &&
    password.value &&
    passwordConfirm &&
    passwordConfirm.value &&
    password?.value != passwordConfirm?.value
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
  imports: [ReactiveFormsModule, ErrorMessageComponent, NgFor, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  activatedRouter = inject(ActivatedRoute);
  router = inject(Router);
  userService = inject(UserService);

  formSubmitted = false;
  registerForm: FormGroup<RegisterGroup>;

  errorMessages: string[] = [];

  constructor() {
    const username = this.activatedRouter.snapshot.queryParams['username'];

    this.registerForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl(username || '', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        passwordConfirm: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      {
        validators: matchPassword,
      }
    );
  }

  onSubmit() {
    this.formSubmitted = true;

    if (!this.registerForm.valid) {
      return;
    }

    this.userService
      .register(this.registerForm.value as UserRegisterPayload)
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          const e = error as PocketbaseError;

          const messages = extractErrorMessages(e.data);
          this.errorMessages = messages;

          // If an error occurs during registration, complete the Observable
          return of(null);
        }),
        switchMap((res) => {
          // If the registration was successful, res will be defined
          if (res) {
            return this.userService.login({
              username: this.registerForm.value.username,
              password: this.registerForm.value.password,
            } as UserRegisterPayload);
          }
          // If an error occurred during registration, res will be null,
          // so complete the Observable without attempting to log in
          return of(null);
        })
      )
      .subscribe((user) => {
        // If an error occurred during registration or login, user will be null
        if (user) {
          this.router.navigate([`/${user.record.username}/edit`]);
        }
      });
  }
}
