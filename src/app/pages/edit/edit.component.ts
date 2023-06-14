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
import { LinksRecord } from '../..//core/types/pocketbase-types';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  private collectionService = inject(CollectionsService);

  form = new FormArray<
    FormGroup<{
      title: FormControl<string | null>;
      url: FormControl<string | null>;
    }>
  >([]);

  ngOnInit(): void {
    this.collectionService.getList().subscribe((items: LinksRecord[]) => {
      items.forEach(({ title, url }) => {
        this.form.push(
          new FormGroup({
            title: new FormControl(title, [Validators.required]),
            url: new FormControl(url, [Validators.required]),
          })
        );
      });
    });
  }

  addItem() {
    this.form.push(
      new FormGroup({
        title: new FormControl('', [Validators.required]),
        url: new FormControl('', [Validators.required]),
      })
    );

  }

  saveLinks(e: SubmitEvent) {
    e.preventDefault();

    // if (this.form.valid) {
    //   this.user$.pipe(take(1)).subscribe((user) => {
    //     if (user?.uid) {
    //       const usersCollection = doc(this.firestore, 'users', user.uid);

    //       updateDoc(usersCollection, { links: this.form.value }).then(() => {
    //         console.log('Document successfully written!');
    //       });
    //     }
    //   });
    // }
  }
}
