import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  private router = inject(Router);

  logout() {

    // borrar token
    localStorage.removeItem('token');

    // regresar al login
    this.router.navigate(['/']);
  }

}