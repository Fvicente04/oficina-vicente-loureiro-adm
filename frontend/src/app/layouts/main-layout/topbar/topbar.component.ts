import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/ordens-servico': 'Ordens de Serviço',
  '/clientes': 'Clientes',
  '/veiculos': 'Veículos',
  '/estoque': 'Estoque',
  '/financeiro': 'Financeiro',
  '/agendamentos': 'Agendamentos'
};

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  private router = inject(Router);

  pageTitle = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => {
        const url = (e as NavigationEnd).urlAfterRedirects.split('?')[0];
        const base = '/' + url.split('/')[1];
        return PAGE_TITLES[base] ?? 'Sistema de Gestão';
      })
    ),
    { initialValue: PAGE_TITLES[this.router.url.split('?')[0]] ?? 'Sistema de Gestão' }
  );

  novaOS(): void {
    this.router.navigate(['/ordens-servico', 'nova']);
  }
}
