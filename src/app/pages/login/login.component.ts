import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  identity: string = '';
  password: string = '';

  onSubmit() {
    this.userService.login(this.identity, this.password).subscribe(
      (res) => {
        this.router.navigate(['/']);
      }
    );
  }
}
