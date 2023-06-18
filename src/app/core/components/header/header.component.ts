import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavUserInfoComponent } from '../nav-user-info/nav-user-info.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NavUserInfoComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

}
