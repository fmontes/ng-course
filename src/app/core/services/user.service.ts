import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ListResult, RecordAuthResponse } from 'pocketbase';
import { environment } from 'src/environments/environment.development';
import { UsersResponse } from '../types/pocketbase-types';
import { CookieService } from 'ngx-cookie-service';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

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
  login(identity: string, password: string) {
    return this.http
      .post<RecordAuthResponse<UsersResponse>>(
        `${environment.apiUrl}/api/collections/users/auth-with-password`,
        {
          identity,
          password,
        }
      )
      .pipe(
        tap(({ token, record }) => {
          this.authState$.next(record);
          this.cookieService.set('token', token);
          this.cookieService.set('userId', record.id);
        })
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
