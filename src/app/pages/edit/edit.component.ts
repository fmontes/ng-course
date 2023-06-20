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
import { LinksRecord } from '../../core/types/pocketbase-types';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ProfileData } from 'src/app/core/resolvers/profile.resolver';
import { DevicePreviewComponent } from 'src/app/core/components/device-preview/device-preview.component';

type FormLinkGroup = FormGroup<{
  title: FormControl<string | null>;
  url: FormControl<string | null>;
  id: FormControl<string | null>;
}>;
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DevicePreviewComponent],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  private collectionService = inject(CollectionsService);
  private cookieService = inject(CookieService);
  private activatedRoute = inject(ActivatedRoute);

  form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    items: new FormArray<FormLinkGroup>([]),
  });

  get items() {
    return this.form.get('items') as FormArray<FormLinkGroup>;
  }

  ngOnInit(): void {
    const data$ = this.activatedRoute.data.pipe(
      map(({ data }) => data)
    ) as unknown as Observable<ProfileData>;

    data$.pipe(take(1)).subscribe(({ links, user }) => {
      this.form.patchValue({
        name: user.name,
        description: user.description,
      });

      links.forEach(({ title, url, id }) => {
        this.items.push(this.getFormLinkGroup(title, url, id));
      });
    });
  }

  addItem() {
    this.items.push(this.getFormLinkGroup());
  }

  saveLinks(e: SubmitEvent) {
    e.preventDefault();

    const newLinks: LinksRecord[] | undefined = this.form.value.items
      ?.filter((item) => item.id === '' && !!item.title && !!item.url)
      .map(({ title, url }) => {
        if (!title || !url) return;

        const link: LinksRecord = {
          title,
          url,
          owner: this.cookieService.get('userId'),
        };
        return link;
      })
      .filter((item): item is LinksRecord => item !== undefined);

    if (newLinks) {
      this.collectionService.saveItems(newLinks).subscribe((res) => {
        console.log(res);
      });
    }
  }

  private getFormLinkGroup(title = '', url = '', id = ''): FormLinkGroup {
    return new FormGroup({
      title: new FormControl(title, [Validators.required]),
      url: new FormControl(url, [Validators.required]),
      id: new FormControl(id, [Validators.required]),
    });
  }
}
