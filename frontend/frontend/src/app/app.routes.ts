import { Routes } from '@angular/router';

// Lazy-load de los módulos funcionales para rutas principales
export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'inicio',
    loadChildren: () => import('./features/inicio/inicio.module').then(m => m.InicioModule),
  },
  { path: '**', redirectTo: 'login' }
];
