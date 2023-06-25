import { ActivatedRouteSnapshot, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { EditComponent } from './pages/edit/edit.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { profileResolver } from './core/resolvers/profile.resolver';
import { profileGuard } from './core/guards/profile.guard';
import { ProfileNotFoundComponent } from './pages/profile-not-found/profile-not-found.component';
import { RegisterComponent } from './pages/register/register.component';
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
        component: HomeComponent,
        title: `${NAME} - Create and share your own links`,
      },
      {
        path: 'login',
        component: LoginComponent,
        title: `${NAME} - Login`,
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [registerGuard],
        title: `${NAME} - Register`,
      },
      {
        path: 'profile-not-found',
        component: ProfileNotFoundComponent,
        title: `${NAME} - Profile not found`,
      },
      {
        path: ':username/edit',
        component: EditComponent,
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
    component: ProfileComponent,
    title: getNameTitle,
    resolve: {
      data: profileResolver,
    },
  },
];
