import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersResponse } from '../../types/pocketbase-types';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css'],
})
export class UserAvatarComponent {
  @Input() user: UsersResponse | null = null;
}
