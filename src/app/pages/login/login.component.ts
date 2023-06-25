import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../core/services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  identity: string = '';
  password: string = '';
  error: string = '';

  /**
   * Submit the login form
   *
   * @memberof LoginComponent
   */
  onSubmit(): void {
    if (this.identity === '' || this.password === '') {
      this.error = 'Please enter your username and password';
      return;
    }

    this.userService
      .login({ username: this.identity, password: this.password })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.error = err.error.message;
          return of(null);
        }),
        filter((user) => !!user)
      )
      .subscribe((user) => {
        this.error = '';
        this.router.navigate([`/${user?.record.username}/edit`]);
      });
  }
}
