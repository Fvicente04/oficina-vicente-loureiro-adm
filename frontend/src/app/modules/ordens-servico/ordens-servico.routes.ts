import { Routes } from '@angular/router';

export const ordensServicoRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/ordens-servico-lista.component').then((m) => m.OrdensServicoListaComponent)
  }
];
