import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/pages/login.component').then((m) => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./modules/dashboard/pages/dashboard.component').then((m) => m.DashboardComponent)
      },
      {
        path: 'ordens-servico',
        loadChildren: () =>
          import('./modules/ordens-servico/ordens-servico.routes').then((m) => m.ordensServicoRoutes)
      },
      {
        path: 'clientes',
        loadChildren: () =>
          import('./modules/clientes/clientes.routes').then((m) => m.clientesRoutes)
      },
      {
        path: 'veiculos',
        loadChildren: () =>
          import('./modules/veiculos/veiculos.routes').then((m) => m.veiculosRoutes)
      },
      {
        path: 'estoque',
        loadChildren: () =>
          import('./modules/estoque/estoque.routes').then((m) => m.estoqueRoutes)
      },
      {
        path: 'financeiro',
        loadChildren: () =>
          import('./modules/financeiro/financeiro.routes').then((m) => m.financeiroRoutes)
      },
      {
        path: 'agendamentos',
        loadChildren: () =>
          import('./modules/agendamentos/agendamentos.routes').then((m) => m.agendamentosRoutes)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
