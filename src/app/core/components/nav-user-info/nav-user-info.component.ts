import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

@Component({
  selector: 'app-nav-user-info',
  standalone: true,
  imports: [CommonModule, RouterLink, UserAvatarComponent],
  templateUrl: './nav-user-info.component.html',
  styleUrls: ['./nav-user-info.component.css'],
})
export class NavUserInfoComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  authState$ = this.userService.authState$;

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
