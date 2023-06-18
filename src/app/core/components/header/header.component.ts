import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavUserInfoComponent } from '../nav-user-info/nav-user-info.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NavUserInfoComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

}
