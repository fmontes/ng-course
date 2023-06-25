import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

@Component({
  selector: 'app-public-page',
  standalone: true,
  imports: [UserAvatarComponent, NgFor],
  templateUrl: './public-page.component.html',
  styleUrls: ['./public-page.component.css'],
})
export class PublicPageComponent {
  @Input() data: any | null = null;
}
