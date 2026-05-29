import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProductosComponent } from './pages/productos/productos';
import { Categorias } from './pages/categorias/categorias';
import { Ventas } from './pages/ventas/ventas';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
  path: 'productos',
  component: ProductosComponent,
  canActivate: [authGuard]
},
{
  path: 'categorias',
  component: Categorias,
  canActivate: [authGuard]
},

{
  path: 'ventas',
  component: Ventas,
  canActivate: [authGuard]
}
];