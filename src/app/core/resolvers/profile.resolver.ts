import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { switchMap, map } from 'rxjs';
import { CollectionsService } from '../services/collections.service';
import { UserService } from '../services/user.service';
import { UsersResponse, LinksResponse } from '../types/pocketbase-types';

export type ProfileData = {
  user: UsersResponse;
  links: LinksResponse[];
};

export const profileResolver: ResolveFn<ProfileData> = (route, state) => {
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
