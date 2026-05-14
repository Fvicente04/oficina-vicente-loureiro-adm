import { Routes } from '@angular/router';

export const agendamentosRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/agendamentos-lista.component').then((m) => m.AgendamentosListaComponent)
  }
];
