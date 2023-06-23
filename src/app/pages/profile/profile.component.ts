import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProfileData } from '../../core/resolvers/profile.resolver';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  activatedRoute = inject(ActivatedRoute);

  data$ = this.activatedRoute.data.pipe(
    map(({ data }) => data)
  ) as unknown as Observable<ProfileData>;
}
