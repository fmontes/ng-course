import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { LinksRecord, LinksResponse } from '../types/pocketbase-types';
import { ListResult } from 'pocketbase';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  http = inject(HttpClient);

  getList() {
    return this.http.get<ListResult<LinksRecord>>(
      `${environment.apiUrl}/api/collections/links/records`
    );
  }
}
