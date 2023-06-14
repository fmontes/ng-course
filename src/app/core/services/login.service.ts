import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment.development';
import { RecordAuthResponse } from 'pocketbase';
import { UsersResponse } from '../types/pocketbase-types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);

  /**
   * Make the login request
   *
   * @param {string} identity
   * @param {string} password
   * @return {*}
   * @memberof LoginService
   */
  login(identity: string, password: string) {
    return this.http.post<RecordAuthResponse<UsersResponse>>(
      `${environment.apiUrl}/api/collections/users/auth-with-password`,
      {
        identity,
        password,
      }
    );
  }
}
