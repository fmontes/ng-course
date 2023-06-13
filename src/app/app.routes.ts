import { Routes } from "@angular/router";
import { haveUsernameGuard } from "./core/guards/have-username.guard";
import { isUserLoginGuard } from "./core/guards/is-user-login.guard";

import { SetUsernameComponent } from "./pages/set-username/set-username.component";
import { LoginComponent } from "./pages/login/login.component";
import { EditComponent } from "./pages/edit/edit.component";
import { HomeComponent } from "./pages/home/home.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { userResolver } from "./core/resolvers/user.resolver";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'set-username',
    component: SetUsernameComponent,
    canActivate: [isUserLoginGuard],
  },
  {
    path: 'edit',
    canActivate: [haveUsernameGuard],
    component: EditComponent
  },
  {
    path: ':username',
    component: ProfileComponent,
    resolve: {
      data: userResolver
    }
  },
];
