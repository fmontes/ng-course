import { Routes } from "@angular/router";
import { haveUsernameGuard } from "./guards/have-username.guard";
import { isUserLoginGuard } from "./guards/is-user-login.guard";

import { SetUsernameComponent } from "./pages/set-username/set-username.component";
import { LoginComponent } from "./pages/login/login.component";
import { EditComponent } from "./pages/edit/edit.component";
import { HomeComponent } from "./pages/home/home.component";
import { UsernameComponent } from "./pages/username/username.component";
import { userResolver } from "./resolvers/user.resolver";

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
    component: UsernameComponent,
    resolve: {
      data: userResolver
    }
  },
];
