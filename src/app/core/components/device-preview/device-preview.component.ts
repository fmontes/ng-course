import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileData } from '../../resolvers/profile.resolver';

@Component({
  selector: 'app-device-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device-preview.component.html',
  styleUrls: ['./device-preview.component.css'],
})
export class DevicePreviewComponent {
  @Input() data: any | null = null;
}
