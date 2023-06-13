import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private loginService = inject(LoginService);

  identity: string = '';
  password: string = '';

  onSubmit() {
    this.loginService.login(this.identity, this.password).subscribe(
      (res) => {
        console.log({ res });
      }
    );
  }
}
