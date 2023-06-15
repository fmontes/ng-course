import { Routes } from "@angular/router";
import { isUserLoginGuard } from "./core/guards/is-user-login.guard";

import { LoginComponent } from "./pages/login/login.component";
import { EditComponent } from "./pages/edit/edit.component";
import { HomeComponent } from "./pages/home/home.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { profileResolver } from "./core/resolvers/profile.resolver";

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
    path: 'edit',
    canActivate: [isUserLoginGuard],
    component: EditComponent
  },
  {
    path: ':username',
    component: ProfileComponent,
    resolve: {
      data: profileResolver
    }
  },
];
