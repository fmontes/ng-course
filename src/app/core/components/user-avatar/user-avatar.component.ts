import { Component, Input } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import { UsersResponse } from '../../types/pocketbase-types';
import { AvatarUrlPipe } from '../../pipes/avatar-url.pipe';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [NgStyle, NgIf, AvatarUrlPipe],
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css'],
})
export class UserAvatarComponent {
  @Input() user: Pick<UsersResponse, 'id' | 'avatar' | 'name'> | null = null;
  @Input() size = 64;
}
