import { Component, inject } from '@angular/core';
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
import {
  UserRegisterPayload,
  UserService,
} from 'src/app/core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

type RegisterGroup = {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  username: FormControl<string | null>;
  password: FormControl<string | null>;
  passwordConfirm: FormControl<string | null>;
};

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
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup<RegisterGroup>;
  userService = inject(UserService);
  router = inject(Router);
  activatedRouter = inject(ActivatedRoute);

  constructor() {
    const username = this.activatedRouter.snapshot.queryParams['username'];

    this.registerForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required, Validators.email]),
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl(username || '', Validators.required),
        password: new FormControl('', Validators.required),
        passwordConfirm: new FormControl('', Validators.required),
      },
      {
        validators: matchPassword,
      }
    );
  }

  onSubmit() {
    if (!this.registerForm.invalid) {
      return;
    }

    this.userService
      .register(this.registerForm.value as UserRegisterPayload)
      .subscribe((res) => {
        this.router.navigate([`/${res.username}`]);
      });
  }
}
