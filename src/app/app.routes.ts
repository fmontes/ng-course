import { Routes } from "@angular/router";
import { isUserLoginGuard } from "./core/guards/is-user-login.guard";

import { LoginComponent } from "./pages/login/login.component";
import { EditComponent } from "./pages/edit/edit.component";
import { HomeComponent } from "./pages/home/home.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { profileResolver } from "./core/resolvers/profile.resolver";
import { profileGuard } from "./core/guards/profile.guard";
import { ProfileNotFoundComponent } from "./pages/profile-not-found/profile-not-found.component";
import { RegisterComponent } from "./pages/register/register.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [isUserLoginGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile-not-found',
    component: ProfileNotFoundComponent,
  },
  {
    path: ':username',
    component: ProfileComponent,
    resolve: {
      data: profileResolver
    },
  },
  {
    path: ':username/edit',
    component: EditComponent,
    canActivate: [profileGuard],
    resolve: {
      data: profileResolver
    },
  }
];
