import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';

  login() {

    const data = {
      email: this.email,
      password: this.password
    };

    this.authService.login(data)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/dashboard']);
        },

        error: (error) => {
          console.error(error);
          alert('Credenciales incorrectas');
        }
      });
  }
}