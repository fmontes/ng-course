import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DevicePreviewComponent } from '../../core/components/device-preview/device-preview.component';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, DevicePreviewComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  message = '';
  router = inject(Router);
  userService = inject(UserService);
  username: string = '';

  onSubmit(): void {
    this.message = '';

    if (this.username) {
      this.userService.getByUsername(this.username).subscribe((user) => {
        if (!user) {
          this.router.navigate(['/register'], {
            queryParams: { username: this.username },
          });
        }

        this.message = 'User already exists';
      });
    }

    this.message = 'Please enter a username';
  }
}
