import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Pipe({
  name: 'avatarUrl',
  pure: true,
  standalone: true,
})
export class AvatarUrlPipe implements PipeTransform {
  transform(id: string, avatarUrl: string): string {
    return `${environment.apiUrl}/api/files/_pb_users_auth_/${id}/${avatarUrl}?thumb=100x100`;
  }
}
