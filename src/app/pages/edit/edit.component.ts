import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormArray,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { take } from 'rxjs/operators';

type Link = {
  name: string;
  url: string;
};

export type Data = {
  username: string;
  links: Link[];
};

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  form = new FormArray<
    FormGroup<{
      name: FormControl<string | null>;
      link: FormControl<string | null>;
    }>
  >([]);

  ngOnInit(): void {
    // this.user$.pipe(take(1)).subscribe((user) => {
    //   if (user?.uid) {
    //     const docRef = doc(
    //       this.firestore,
    //       'users',
    //       user.uid
    //     ) as DocumentReference<Data>;

    //     getDoc<Data>(docRef).then((docSnap) => {
    //       if (docSnap.exists() && docSnap.data().links) {
    //         docSnap.data().links.forEach((link) => {
    //           this.form.push(
    //             new FormGroup({
    //               name: new FormControl(link.name, [Validators.required]),
    //               link: new FormControl(link.link, [Validators.required]),
    //             })
    //           );
    //         });
    //       }
    //     });
    //   }
    // });
  }

  logout() {
    // signOut(this.auth).then(() => {
    //   this.router.navigate(['/login']);
    // });
  }

  addItem() {
    this.form.push(
      new FormGroup({
        name: new FormControl('', [Validators.required]),
        link: new FormControl('', [Validators.required]),
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
