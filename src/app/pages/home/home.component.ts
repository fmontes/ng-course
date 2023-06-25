import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicPageComponent } from '../../core/components/public-page/public-page.component';
import { UserService } from '../../core/services/user.service';
import { PreviewPageComponent } from '../../core/components/preview-page/preview-page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, FormsModule, PublicPageComponent, PreviewPageComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  router = inject(Router);
  userService = inject(UserService);

  username: string = '';
  message = '';

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
