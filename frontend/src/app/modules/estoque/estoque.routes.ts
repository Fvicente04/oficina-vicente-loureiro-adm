import { Routes } from '@angular/router';

export const estoqueRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/estoque-lista.component').then((m) => m.EstoqueListaComponent)
  }
];
