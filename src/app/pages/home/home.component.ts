import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DevicePreviewComponent } from '../../core/components/device-preview/device-preview.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, DevicePreviewComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  router = inject(Router);
  username: string = '';

  onSubmit(): void {
    this.router.navigate(['/register'], {
      queryParams: { username: this.username },
    });
  }
}
