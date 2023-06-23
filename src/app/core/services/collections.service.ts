import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LinksRecord, LinksResponse } from '../types/pocketbase-types';
import { ListResult } from 'pocketbase';
import { map } from 'rxjs/operators';
import { Observable, forkJoin, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { LinkPayload } from '../../pages/edit/edit.component';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  http = inject(HttpClient);

  /**
   * Get the list of links by owner
   *
   * @param {string} owner
   * @return {*}  {Observable<LinksResponse[]>}
   * @memberof CollectionsService
   */
  getListByOwner(owner: string): Observable<LinksResponse[]> {
    return this.http
      .get<ListResult<LinksResponse<LinksRecord>>>(
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
  saveItems(items: LinkPayload[]): Observable<LinksResponse[]> {
    const requests = items.map((item) =>
      item.id ? this.updateItem(item) : this.createItem(item)
    );

    return forkJoin(requests);
  }

  /**
   * Delete a link by id
   *
   * @param {string} id
   * @return {*}  {Observable<LinksResponse>}
   * @memberof CollectionsService
   */
  deleteItem(id: string): Observable<LinksResponse> {
    return this.http.delete<LinksResponse>(
      `${environment.apiUrl}/api/collections/links/records/${id}`
    );
  }

  private createItem(
    item: LinksRecord & { id: string }
  ): Observable<LinksResponse> {
    return this.http.post<LinksResponse>(
      `${environment.apiUrl}/api/collections/links/records`,
      {
        title: item.title,
        url: item.url,
        owner: item.owner,
      }
    );
  }

  private updateItem(
    item: LinksRecord & { id: string }
  ): Observable<LinksResponse> {
    return this.http.patch<LinksResponse>(
      `${environment.apiUrl}/api/collections/links/records/${item.id}`,
      {
        title: item.title,
        url: item.url,
        owner: item.owner,
      }
    );
  }
}
