import { Component } from '@angular/core';
import { NavUserInfoComponent } from '../nav-user-info/nav-user-info.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavUserInfoComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

}
