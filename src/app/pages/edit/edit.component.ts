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

type FormLinkGroup = FormGroup<{
  title: FormControl<string | null>;
  url: FormControl<string | null>;
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

  form = new FormArray<FormLinkGroup>([]);

  ngOnInit(): void {
    this.collectionService.getList().subscribe((items: LinksRecord[]) => {
      items.forEach(({ title, url }) => {
        this.form.push(this.getFormLinkGroup(title, url));
      });
    });
  }

  addItem() {
    this.form.push(this.getFormLinkGroup());
  }

  saveLinks(e: SubmitEvent) {
    e.preventDefault();
  }

  private getFormLinkGroup(title = '', url = ''): FormLinkGroup {
    return new FormGroup({
      title: new FormControl(title, [Validators.required]),
      url: new FormControl(url, [Validators.required]),
    });
  }
}
