import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileData } from '../../resolvers/profile.resolver';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

@Component({
  selector: 'app-device-preview',
  standalone: true,
  imports: [CommonModule, UserAvatarComponent],
  templateUrl: './device-preview.component.html',
  styleUrls: ['./device-preview.component.css'],
})
export class DevicePreviewComponent {
  @Input() data: any | null = null;
}
