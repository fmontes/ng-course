import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { LinksRecord, LinksResponse } from '../types/pocketbase-types';
import { ListResult } from 'pocketbase';
import { map } from 'rxjs/operators';
import { Observable, forkJoin, of } from 'rxjs';

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
  getList(): Observable<LinksResponse[]> {
    return this.http
      .get<ListResult<LinksResponse>>(
        `${environment.apiUrl}/api/collections/links/records`
      )
      .pipe(map((res) => res.items));
  }

  /**
   * Get the list of links by owner
   *
   * @param {string} owner
   * @return {*}  {Observable<LinksResponse[]>}
   * @memberof CollectionsService
   */
  getListByOwner(owner: string): Observable<LinksResponse[]> {
    return this.http
      .get<ListResult<LinksResponse>>(
        `${environment.apiUrl}/api/collections/links/records?filter=(owner='${owner}')`
      )
      .pipe(map((res) => res.items));
  }

  /**
   * Save the list of links
   *
   * @param {LinksRecord[]} items
   * @return {*}  {Observable<LinksResponse[]>}
   * @memberof CollectionsService
   */
  saveItems(items: LinksRecord[]): Observable<LinksResponse[]> {
    const requests = items.map((item) =>
      this.http.post<LinksResponse>(
        `${environment.apiUrl}/api/collections/links/records`,
        {
          title: item.title,
          url: item.url,
          owner: item.owner,
        }
      )
    );

    return forkJoin(requests);
  }
}
