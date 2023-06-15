import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { LinksResponse, UsersResponse } from '../types/pocketbase-types';
import { CollectionsService } from '../services/collections.service';
import { Observable } from 'rxjs';

export type ProfileData = {
  user: UsersResponse;
  links: LinksResponse[];
};

export const userResolver: ResolveFn<Observable<ProfileData>> = (route) => {
  const userService = inject(UserService);
  const collectionService = inject(CollectionsService);
  const username: string = route.params['username'];

  return userService.getByUsername(username).pipe(
    switchMap((user: UsersResponse) => {
      return collectionService.getListByOwner(user.id).pipe(
        map((links: LinksResponse[]) => {
          return {
            user: user,
            links: links,
          };
        })
      );
    })
  );
};
