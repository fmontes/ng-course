import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ListResult, RecordAuthResponse } from 'pocketbase';
import { UsersResponse } from '../types/pocketbase-types';
import { CookieService } from 'ngx-cookie-service';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment.development';

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
   * Save the avatar image
   *
   * @param {string} id
   * @param {File} avatar
   * @return {*}
   * @memberof UserService
   */
  saveAvatar(id: string, avatar: File) {
    const formData = new FormData();
    formData.append('avatar', avatar);

    return this.http.patch<UsersResponse>(
      `${environment.apiUrl}/api/collections/users/records/${id}`,
      formData
    ).pipe(tap((user: UsersResponse) => {
      this.authState$.next(user);
    }));
  }

  /**
   * Save the user information
   *
   * @param {string} id
   * @param {(Pick<UsersResponse, 'name' | 'description'>)} user
   * @return {*}
   * @memberof UserService
   */
  saveUser(id: string, user: Pick<UsersResponse, 'name' | 'description'>) {
    return this.http.patch<UsersResponse>(
      `${environment.apiUrl}/api/collections/users/records/${id}`,
      user
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
