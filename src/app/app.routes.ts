import { Routes } from '@angular/router';

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

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [registerGuard],
      },
      {
        path: 'profile-not-found',
        component: ProfileNotFoundComponent,
      },
      {
        path: ':username/edit',
        component: EditComponent,
        canActivate: [profileGuard],
        resolve: {
          data: profileResolver,
        },
      },
    ],
  },
  {
    path: ':username',
    component: ProfileComponent,
    resolve: {
      data: profileResolver,
    },
  },
];
