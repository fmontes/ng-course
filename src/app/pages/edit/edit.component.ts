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

type FormLinkGroup = FormGroup<{
  title: FormControl<string | null>;
  url: FormControl<string | null>;
  id: FormControl<string | null>;
}>;
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  private collectionService = inject(CollectionsService);
  private cookieService = inject(CookieService);

  form = new FormArray<FormLinkGroup>([]);

  ngOnInit(): void {
    this.collectionService.getList().subscribe((items) => {
      items.forEach(({ title, url, id }) => {
        this.form.push(this.getFormLinkGroup(title, url, id));
      });
    });
  }

  addItem() {
    this.form.push(this.getFormLinkGroup());
  }

  saveLinks(e: SubmitEvent) {
    e.preventDefault();

    const newLinks: LinksRecord[] = this.form.value
      .filter((item) => item.id === '' && !!item.title && !!item.url)
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

    this.collectionService.saveItems(newLinks).subscribe((res) => {
      console.log(res);
    });
  }

  private getFormLinkGroup(title = '', url = '', id = ''): FormLinkGroup {
    return new FormGroup({
      title: new FormControl(title, [Validators.required]),
      url: new FormControl(url, [Validators.required]),
      id: new FormControl(id, [Validators.required]),
    });
  }
}
