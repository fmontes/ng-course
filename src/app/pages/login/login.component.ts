import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  onSubmit() {
    // Here is where you would typically call a service to submit
    // the username and password to your server for authentication.
    console.log('Username: ', this.username);
    console.log('Password: ', this.password);
  }
}
