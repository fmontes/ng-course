import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ListResult, RecordAuthResponse } from 'pocketbase';
import { environment } from 'src/environments/environment.development';
import { UsersResponse } from '../types/pocketbase-types';
import { CookieService } from 'ngx-cookie-service';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

type UserCredentials = {
  username: string;
  password: string;
};

export type UserRegisterPayload = UserCredentials & {
  name: string;
  email: string;
  passwordConfirm: string;
  verified: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  authState$ = new Subject<UsersResponse | null>();

  constructor() {
    const userId = this.cookieService.get('userId');

    if (userId) {
      this.http
        .get<UsersResponse>(
          `${environment.apiUrl}/api/collections/users/records/${userId}`
        )
        .subscribe((user) => {
          this.authState$.next(user);
        });
    } else {
      this.authState$.next(null);
    }
  }

  /**
   * Make the login request
   *
   * @param {string} identity email or username
   * @param {string} password a simple password
   * @return {*}
   * @memberof LoginService
   */
  login({ username, password }: UserCredentials) {
    return this.http
      .post<RecordAuthResponse<UsersResponse>>(
        `${environment.apiUrl}/api/collections/users/auth-with-password`,
        {
          identity: username,
          password,
        }
      )
      .pipe(
        tap(({ token, record }) => {
          this.authState$.next(record);
          this.cookieService.delete('token');
          this.cookieService.delete('userId');
          this.cookieService.set('token', token);
          this.cookieService.set('userId', record.id);
        })
      );
  }

  /**
   * Register a new user
   *
   * @param {UserRegisterPayload} { name, username, password, email, confirmPassword }
   * @return {*}
   * @memberof UserService
   */
  register({
    name,
    username,
    password,
    email,
    passwordConfirm,
  }: UserRegisterPayload) {
    return this.http.post<UsersResponse>(
      `${environment.apiUrl}/api/collections/users/records`,
      { name, username, password, email, passwordConfirm }
    );
  }

  /**
   * Remove the user information from cookies
   *
   * @memberof UserService
   */
  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('userId');
    this.authState$.next(null);
  }

  /**
   * Get the user information by username
   *
   * @param {string} username
   * @return {*}  {Observable<UsersResponse>}
   * @memberof UserService
   */
  getByUsername(username: string): Observable<UsersResponse> {
    return this.http
      .get<ListResult<UsersResponse>>(
        `${environment.apiUrl}/api/collections/users/records?filter=(username='${username}')`
      )
      .pipe(map((res) => res.items[0]));
  }
}
