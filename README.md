# OFICINA VICENTE LOUREIRO — SISTEMA DE GESTÃO

## Descrição
Sistema de gestão interno para oficina de lanternagem e pintura em Campo Grande, RJ.

## Stack Tecnológico

### Frontend
- **Framework**: Angular 19
- **Linguagem**: TypeScript
- **Styling**: SCSS com Postprocessing
- **Visualização**: Chart.js para gráficos
- **Componentes**: Angular Standalone Components + Signals

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Banco de Dados**: PostgreSQL
- **ORM**: Sequelize
- **Autenticação**: JWT (JSON Web Tokens)

## Estrutura de Pastas

```
oficina-gestao/
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── core/
│       │   │   ├── auth/              # Serviços e guards de autenticação
│       │   │   ├── guards/            # Route guards (AuthGuard, etc)
│       │   │   └── interceptors/      # HTTP interceptors (JWT)
│       │   ├── layouts/               # Layout components (Sidebar, Topbar)
│       │   ├── modules/               # Feature modules
│       │   │   ├── dashboard/
│       │   │   ├── ordens-servico/
│       │   │   ├── clientes/
│       │   │   ├── veiculos/
│       │   │   ├── estoque/
│       │   │   ├── financeiro/
│       │   │   └── agendamentos/
│       │   └── shared/
│       │       ├── components/        # Componentes reutilizáveis
│       │       └── services/          # Serviços compartilhados
│       └── assets/
│           └── styles/
│               ├── variables.scss     # Variáveis e mixin globais
│               ├── reset.scss         # Reset e normalize
│               ├── components.scss    # Componentes base
│               ├── utilities.scss     # Classes utilitárias
│               └── global.scss        # Importação global
└── backend/
    ├── src/
    │   ├── models/                    # Sequelize models
    │   ├── routes/                    # Express routes
    │   ├── controllers/               # Lógica de negócio
    │   ├── middleware/                # Express middleware
    │   ├── services/                  # Serviços
    │   └── utils/                     # Utilidades
    ├── migrations/                    # Database migrations
    ├── seeders/                       # Database seeders
    └── config/                        # Configurações

```

## Design System

### Paleta de Cores

| Uso | Cor | Hex |
|-----|-----|-----|
| Fundo Principal | Dark | #080808 |
| Fundo Surface | Light Dark | #111111 |
| Fundo Surface Secondary | Lighter Dark | #171717 |
| Fundo Sidebar | Darkest | #0d0d0d |
| **Accent (Vermelho)** | **Principal** | **#D4001A** |
| Texto Principal | Branco | #F5F5F5 |
| Texto Secundário | Cinza | rgba(255,255,255,0.55) |
| Bordas | Cinza Sutil | rgba(255,255,255,0.07) |

### Status Badges (Semáforo)
- **Aberta**: Amarelo (#FFC107)
- **Em Andamento**: Azul (#2196F3)
- **Concluída**: Verde (#4CAF50)
- **Aguardando Peça**: Vermelho (#D4001A)
- **Cancelada**: Cinza (#9E9E9E)

### Tipografia

| Tipo | Font | Uso |
|------|------|-----|
| Headings | Bebas Neue | Títulos, uppercase, letter-spacing |
| Body | Barlow | Texto corpo |
| Body Condensed | Barlow Condensed | Texto comprimido |

### Componentes Base

Todos os componentes estão definidos em `src/assets/styles/components.scss`:
- **Buttons** (.btn, .btn--primary, .btn--secondary, .btn--ghost)
- **Cards** (.card, .card--elevated, .card--kpi)
- **Badges** (.badge--aberta, .badge--em-andamento, etc)
- **Forms** (.form-group, .form-label, .form-input)
- **Tables** (.table, .table--striped, .table--hoverable)
- **Alerts** (.alert--success, .alert--error, .alert--warning)
- **Progress** (.progress, .progress__bar)
- **Empty State** (.empty-state)

### Utilities Classes

Disponíveis em `src/assets/styles/utilities.scss`:
- Display: .d-none, .d-block, .d-flex, .d-grid, etc
- Flexbox: .flex-wrap, .justify-center, .align-center, .gap-lg, etc
- Spacing: .m-lg, .p-md, .mt-xl, .px-lg, etc
- Sizing: .w-full, .h-auto, .max-w-full, etc
- Text: .text-uppercase, .font-bold, .text-center, etc
- Colors: .text-accent, .bg-surface, .text-primary, etc
- Borders: .border, .border-accent, .border-radius-md, etc
- Shadows: .shadow-md, .shadow-lg, etc

## Variáveis SCSS

As variáveis globais estão em `src/assets/styles/variables.scss`:

### Espaçamento
```scss
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 12px;
$spacing-lg: 16px;
$spacing-xl: 24px;
$spacing-2xl: 32px;
$spacing-3xl: 48px;
```

### Tamanho de Fonte
```scss
$font-size-xs: 12px;
$font-size-sm: 14px;
$font-size-base: 16px;
$font-size-lg: 18px;
$font-size-xl: 24px;
$font-size-2xl: 32px;
$font-size-3xl: 48px;
```

### Layout
```scss
$sidebar-width: 240px;
$topbar-height: 60px;
$content-padding: 32px;
```

### Mixins Disponíveis
- `@include flex-center;` - Flex com center
- `@include flex-between;` - Flex com space-between
- `@include truncate;` - Truncate text em uma linha
- `@include truncate-lines($lines);` - Truncate em N linhas
- `@include heading-style($size);` - Estilo de heading
- `@include body-text($size, $weight);` - Estilo de texto
- `@include smooth-transition($props);` - Transição suave
- `@include border-accent-left;` - Borda esquerda vermelha (KPI)
- `@include focus-outline;` - Outline focus
- `@include disabled-state;` - Estado desabilitado

## Como Usar o Design System

### 1. Importar Global Styles
No seu `main.ts` (Angular):
```typescript
import './assets/styles/global.scss';
```

### 2. Usar Classes Utilitárias em Templates
```html
<div class="d-flex justify-between align-center gap-lg p-xl">
  <h2 class="text-2xl font-bold">Título</h2>
  <button class="btn btn--primary">Ação</button>
</div>
```

### 3. Usar Variáveis em Componentes SCSS
```scss
@import '@/assets/styles/variables.scss';

.meu-componente {
  padding: $spacing-lg;
  background-color: $color-bg-surface;
  border: 1px solid $color-border;
  @include smooth-transition(background-color);

  &:hover {
    background-color: $color-bg-surface-secondary;
  }
}
```

### 4. Usar Mixins em Componentes
```scss
.my-heading {
  @include heading-style($font-size-xl);
}

.my-button {
  @include flex-center;
  padding: $spacing-md $spacing-lg;
  @include smooth-transition(all);
}
```

## Módulos do Sistema

### 1. Dashboard
- KPI cards: Faturamento, OS abertas, Veículos no pátio, A receber
- Gráfico de faturamento (últimos 6 meses)
- Tabela de últimas 5 OS
- Card de estoque crítico

### 2. Ordens de Serviço
- Lista com filtros (status, data, cliente)
- Criação/edição de OS
- Detalhe com itens de serviço
- Gerenciamento de status

### 3. Clientes
- Lista de clientes
- Cadastro/edição
- Histórico de OS

### 4. Veículos
- Cadastro por cliente
- Histórico de serviços
- Movimentação de pátio

### 5. Estoque
- Controle de peças/materiais
- Controle de minestoque
- Movimentações
- Alertas de reposição

### 6. Financeiro
- Fluxo de caixa
- Contas a pagar/receber
- Relatórios por período

### 7. Agendamentos
- Calendário de serviços
- Disponibilidade de mecânicos
- Notificações

## Rotas do Sistema

```
/login                 → Login
/dashboard             → Dashboard principal
/ordens-servico        → Lista de OS
/ordens-servico/novo   → Nova OS
/ordens-servico/:id    → Detalhe OS
/clientes              → Lista de clientes
/clientes/novo         → Novo cliente
/veiculos              → Lista de veículos
/estoque               → Controle de estoque
/financeiro            → Fluxo de caixa
/agendamentos          → Calendário
```

## Padrões de Código

### Nomenclatura de Componentes
```typescript
// Componentes: PascalCase
export class DashboardComponent {}

// Services: PascalCase com sufixo Service
export class ClienteService {}

// Guards: PascalCase com sufixo Guard
export class AuthGuard {}

// Interfaces: PascalCase com I (opcional)
export interface ICliente {}

// Types: camelCase
type clientStatus = 'ativo' | 'inativo';
```

### Nomenclatura de Arquivos
```
# Componentes
meu-componente.component.ts
meu-componente.component.html
meu-componente.component.scss

# Services
cliente.service.ts

# Guards
auth.guard.ts

# Interfaces
cliente.interface.ts

# Models
cliente.model.ts
```

### Organização de Componentes

```typescript
import { Component, OnInit, signal, computed } from '@angular/core';

@Component({
  selector: 'app-meu-componente',
  standalone: true,
  imports: [CommonModule],
  template: `...`,
  styles: [`...`]
})
export class MeuComponenteComponent implements OnInit {
  // 1. Sinais
  items = signal([]);

  // 2. Sinais computados
  itemCount = computed(() => this.items().length);

  // 3. Constructor com injeções
  constructor(private service: MeuService) {}

  // 4. Lifecycle hooks
  ngOnInit(): void {
    this.loadItems();
  }

  // 5. Métodos
  loadItems(): void {
    // ...
  }
}
```

## Próximos Passos

1. ✓ Estrutura de pastas criada
2. ✓ Design System SCSS
3. [ ] Angular project setup (angular.json, package.json, tsconfig)
4. [ ] Layout principal (Sidebar + Topbar)
5. [ ] Autenticação (Auth Service, Guard, Interceptor)
6. [ ] Backend setup (Express, Sequelize, models)
7. [ ] Dashboard com KPIs
8. [ ] Módulo de Ordens de Serviço
9. [ ] Demais módulos

## Observações Importantes

- Todos os textos em português (pt-BR)
- Moeda em Real (R$): R$ 1.234,56
- Datas: dd/mm/yyyy
- Números de OS: #0001, #0002, etc
- Sistema apenas para uso interno
- Autenticação via JWT
- Angular 19 com Signals e Standalone Components

---

**Última atualização**: Maio 2026
