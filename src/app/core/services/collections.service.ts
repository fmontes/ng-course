import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { LinksRecord, LinksResponse } from '../types/pocketbase-types';
import { ListResult } from 'pocketbase';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  http = inject(HttpClient);

  /**
   * Get the list of links
   *
   * @return {*}  {Observable<LinksRecord[]>}
   * @memberof CollectionsService
   */
  getList(): Observable<LinksRecord[]> {
    return this.http
      .get<ListResult<LinksRecord>>(
        `${environment.apiUrl}/api/collections/links/records`
      )
      .pipe(map((res) => res.items));
  }
}
