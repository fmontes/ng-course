import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormArray,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CollectionsService } from '../../core/services/collections.service';
import {
  LinksRecord,
  LinksResponse,
  UsersResponse,
} from '../../core/types/pocketbase-types';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, merge } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { ProfileData } from '../../core/resolvers/profile.resolver';
import { DevicePreviewComponent } from '../../core/components/device-preview/device-preview.component';
import { AvatarUploadComponent } from './components/avatar-upload/avatar-upload.component';
import { UserService } from '../../core/services/user.service';

type FormLinkGroup = FormGroup<{
  title: FormControl<string | null>;
  url: FormControl<string | null>;
  id: FormControl<string | null>;
}>;

export type LinkPayload = Pick<
  LinksResponse<LinksRecord>,
  'title' | 'url' | 'id' | 'owner'
>;

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DevicePreviewComponent,
    AvatarUploadComponent,
  ],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  private collectionService = inject(CollectionsService);
  private userService = inject(UserService);
  private cookieService = inject(CookieService);
  private activatedRoute = inject(ActivatedRoute);

  form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    id: new FormControl(''),
    avatar: new FormControl(''),
    links: new FormArray<FormLinkGroup>([]),
  });

  get items() {
    return this.form.get('links') as FormArray<FormLinkGroup>;
  }

  get user$() {
    return this.activatedRoute.data.pipe(
      map(({ data }) => data.user)
    ) as unknown as Observable<UsersResponse>;
  }

  ngOnInit(): void {
    const data$ = this.activatedRoute.data.pipe(
      map(({ data }) => data)
    ) as unknown as Observable<ProfileData>;

    data$.pipe(take(1)).subscribe(({ links, user }) => {
      this.form.patchValue({
        name: user.name,
        description: user.description,
        id: user.id,
        avatar: user.avatar,
      });

      links.forEach(({ title, url, id }) => {
        this.items.push(this.getFormLinkGroup(title, url, id));
      });
    });
  }

  /**
   * Add a new link to the form
   *
   * @memberof EditComponent
   */
  addItem() {
    this.items.push(this.getFormLinkGroup());
  }

  /**
   * Delete a link from the form
   *
   * @param {number} index
   * @return {*}
   * @memberof EditComponent
   */
  deleteRow(index: number) {
    const item = this.items.at(index);

    if (!item.value.id) {
      this.items.removeAt(index);
      return;
    }

    this.collectionService.deleteItem(item.value.id as string).subscribe(() => {
      this.items.removeAt(index);
    });
  }

  /**
   * Save the links to the database
   *
   * @param {SubmitEvent} e
   * @memberof EditComponent
   */
  saveLinks(e: SubmitEvent) {
    e.preventDefault();

    if (this.form.valid) {
      const links = this.getLinksPayload(
        this.form.value.links as LinkPayload[]
      );

      const userId = this.form.value.id as string;
      const userInfo = {
        name: this.form.value.name as string,
        description: this.form.value.description as string,
      };

      forkJoin([
        this.userService.saveUser(userId, userInfo),
        this.collectionService.saveItems(links),
      ])
        .pipe(
          catchError((err) => {
            console.error(err);
            return [];
          })
        )
        .subscribe(([user, items]) => {
          if (items) {
            this.items.clear();

            links.forEach(({ title, url, id }) => {
              this.items.push(this.getFormLinkGroup(title, url, id));
            });
          }
        });
    }
  }

  /**
   * Update the avatar id in the form
   *
   * @param {UsersResponse} user
   * @memberof EditComponent
   */
  setAvatar(user: UsersResponse) {
    this.form.patchValue({
      avatar: user.avatar,
    });
  }

  private getLinksPayload(links: LinkPayload[]) {
    return links.map((items) => {
      return {
        title: items.title,
        url: items.url,
        id: items.id,
        owner: this.cookieService.get('userId'),
      };
    }) as LinkPayload[];
  }

  private getFormLinkGroup(title = '', url = '', id = ''): FormLinkGroup {
    return new FormGroup({
      title: new FormControl(title, [Validators.required]),
      url: new FormControl(url, [Validators.required]),
      id: new FormControl(id),
    });
  }
}
