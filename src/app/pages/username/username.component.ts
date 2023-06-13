import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-username',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css'],
})
export class UsernameComponent {
  activatedRoute = inject(ActivatedRoute);

  data$ = this.activatedRoute.data.pipe(map(({ data }) => data));
}
