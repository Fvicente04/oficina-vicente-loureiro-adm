import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ordem-servico-detalhe',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="empty-state">
      <p>Detalhe da Ordem de Serviço</p>
      <a routerLink="/ordens-servico" class="btn btn--secondary">Voltar</a>
    </div>
  `
})
export class OrdemServicoDetalheComponent {}
