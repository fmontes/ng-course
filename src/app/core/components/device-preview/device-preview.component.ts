import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-device-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device-preview.component.html',
  styleUrls: ['./device-preview.component.css'],
})
export class DevicePreviewComponent {
  links = [
    {
      title: 'CV Download',
      url: '#',
    },
    {
      title: 'Youtube',
      url: '#',
    },
    {
      title: 'Twitter',
      url: '#',
    },
    {
      title: 'LinkedIn',
      url: '#',
    },
    {
      title: 'Instagram',
      url: '#',
    },
  ];
}
