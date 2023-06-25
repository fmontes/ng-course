import { Component, Input } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import { UsersResponse } from '../../types/pocketbase-types';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [NgStyle, NgIf],
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css'],
})
export class UserAvatarComponent {
  @Input() user: Pick<UsersResponse, 'id' | 'avatar' | 'name'> | null = null;
  @Input() size = 64;
}
