import { ActivatedRouteSnapshot, Routes } from '@angular/router';

import { profileResolver } from './core/resolvers/profile.resolver';
import { profileGuard } from './core/guards/profile.guard';
import { registerGuard } from './core/guards/register.guard';
import { LayoutComponent } from './core/components/layout/layout.component';
import { UserService } from './core/services/user.service';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';

function getNameTitle(route: ActivatedRouteSnapshot) {
  const userService = inject(UserService);
  const username: string = route.params['username'];

  return userService
    .getByUsername(username)
    .pipe(map((user) => `${NAME} - ${user.name}`));
}

const NAME = 'EchoLink';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        title: `${NAME} - Create and share your own links`,
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
        title: `${NAME} - Login`,
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        canActivate: [registerGuard],
        title: `${NAME} - Register`,
      },
      {
        path: 'profile-not-found',
        loadComponent: () =>
          import('./pages/profile-not-found/profile-not-found.component').then(
            (m) => m.ProfileNotFoundComponent
          ),
        title: `${NAME} - Profile not found`,
      },
      {
        path: ':username/edit',
        loadComponent: () =>
          import('./pages/edit/edit.component').then((m) => m.EditComponent),
        canActivate: [profileGuard],
        title: getNameTitle,
        resolve: {
          data: profileResolver,
        },
      },
    ],
  },
  {
    path: ':username',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
    title: getNameTitle,
    resolve: {
      data: profileResolver,
    },
  },
];
