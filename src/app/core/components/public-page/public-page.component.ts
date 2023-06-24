import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

@Component({
  selector: 'app-public-page',
  standalone: true,
  imports: [CommonModule, UserAvatarComponent],
  templateUrl: './public-page.component.html',
  styleUrls: ['./public-page.component.css'],
})
export class PublicPageComponent {
  @Input() data: any | null = null;
}
