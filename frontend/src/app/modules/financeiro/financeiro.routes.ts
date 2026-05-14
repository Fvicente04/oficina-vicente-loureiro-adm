import { Routes } from '@angular/router';

export const financeiroRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/financeiro-lista.component').then((m) => m.FinanceiroListaComponent)
  }
];
