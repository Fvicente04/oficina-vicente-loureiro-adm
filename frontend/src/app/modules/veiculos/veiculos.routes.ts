import { Routes } from '@angular/router';

export const veiculosRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/veiculos-lista.component').then((m) => m.VeiculosListaComponent)
  }
];
