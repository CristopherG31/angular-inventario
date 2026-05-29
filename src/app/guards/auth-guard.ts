import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  // Verificar si existe sesión
  const token = localStorage.getItem('token');

  if (token) {
    return true; // sí está logeado
  }

  // Si no hay sesión, redirige al login
  router.navigate(['/']);
  return false;
};