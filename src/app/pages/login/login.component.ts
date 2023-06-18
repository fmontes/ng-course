import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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
    this.userService
      .login({ username: this.identity, password: this.password })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.error = err.error.message;
          return of(null);
        }),
        filter((user) => !!user)
      )
      .subscribe((res) => {
        this.error = '';
        this.router.navigate(['/']);
      });
  }
}
