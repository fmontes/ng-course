import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


type UserModel = {
  name: string;
};

@Component({
  selector: 'app-set-username',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './set-username.component.html',
  styleUrls: ['./set-username.component.css'],
})
export class SetUsernameComponent {
  errorMessage = '';

  model: UserModel = {
    name: '',
  };

  async saveUserName() {

  }
}
