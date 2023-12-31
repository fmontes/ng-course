import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { UserAvatarComponent } from '../../../../core/components/user-avatar/user-avatar.component';
import { UsersResponse } from '../../../../core/types/pocketbase-types';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [UserAvatarComponent, NgIf],
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.css'],
})
export class AvatarUploadComponent {
  @Input() user: Pick<UsersResponse, 'id' | 'avatar' | 'name'> | null = null;
  @Output() avatarChange: EventEmitter<UsersResponse> = new EventEmitter();

  userService = inject(UserService);
  selectedImageUrl = '';

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File | undefined = target.files?.[0];

    if (file) {
      this.selectedImageUrl = URL.createObjectURL(file);

      if (!this.user?.id) {
        return;
      }

      this.userService.saveAvatar(this.user?.id, file).subscribe((user) => {
        this.avatarChange.emit(user);
      });
    }
  }
}
