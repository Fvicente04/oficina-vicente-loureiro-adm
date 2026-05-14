# OFICINA VICENTE LOUREIRO — GUIA DE PADRÕES & BOAS PRÁTICAS

## 1. ESTRUTURA DE ARQUIVOS

### Nomenclatura

```
# Components
meu-componente.component.ts
meu-componente.component.html
meu-componente.component.scss

# Services
meu.service.ts

# Guards
auth.guard.ts

# Interceptors
jwt.interceptor.ts

# Models/Interfaces
cliente.model.ts
cliente.interface.ts

# Pipes
formatar-moeda.pipe.ts

# Directives
highlight.directive.ts

# Utilities
formatters.utils.ts
validators.utils.ts
```

### Organização de Pastas

```
app/
├── core/                          # Singleton services, guards, interceptors
│   ├── auth/
│   │   ├── auth.service.ts
│   │   ├── auth.guard.ts
│   │   └── jwt.interceptor.ts
│   ├── constants/
│   │   └── app.constants.ts
│   ├── guards/
│   ├── interceptors/
│   ├── types/
│   │   └── common.types.ts
│   └── utils/
│       ├── formatters.utils.ts
│       └── validators.utils.ts
│
├── layouts/                       # App-level layout components
│   ├── sidebar/
│   │   ├── sidebar.component.ts
│   │   ├── sidebar.component.html
│   │   └── sidebar.component.scss
│   └── topbar/
│
├── modules/                       # Feature modules
│   ├── dashboard/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── dashboard.routes.ts
│   │   └── dashboard.component.ts
│   ├── ordens-servico/
│   ├── clientes/
│   └── ...
│
└── shared/                        # Reusable components, services
    ├── components/
    │   ├── header/
    │   ├── footer/
    │   ├── modal/
    │   ├── loading-spinner/
    │   └── ...
    └── services/
        ├── notification.service.ts
        └── api.service.ts
```

## 2. COMPONENTES ANGULAR 19

### Standalone Components

```typescript
import { Component, OnInit, signal, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-meu-componente',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './meu-componente.component.html',
  styleUrl: './meu-componente.component.scss'
})
export class MeuComponenteComponent implements OnInit {
  // 1. Sinais (estado reativo)
  contador = signal(0);
  itens = signal<string[]>([]);
  isLoading = signal(false);

  // 2. Sinais computados (derivados)
  totalItens = computed(() => this.itens().length);
  itemsFiltrados = computed(() => 
    this.itens().filter(item => item.includes('A'))
  );

  // 3. Inputs (Props)
  titulo = input('Título Padrão');
  dados = input<any>({});

  // 4. Outputs (Eventos)
  itemSelecionado = output<string>();
  aoSalvar = output<any>();

  // 5. Constructor com injeção de dependência
  constructor(private meuService: MeuService) {}

  // 6. Lifecycle hooks
  ngOnInit(): void {
    this.carregarDados();
  }

  // 7. Métodos
  carregarDados(): void {
    this.isLoading.set(true);
    this.meuService.getDados().subscribe({
      next: (dados) => {
        this.itens.set(dados);
        this.isLoading.set(false);
      },
      error: (erro) => {
        console.error('Erro ao carregar dados:', erro);
        this.isLoading.set(false);
      }
    });
  }

  selecionarItem(item: string): void {
    this.itemSelecionado.emit(item);
  }

  incrementarContador(): void {
    this.contador.update(c => c + 1);
  }
}
```

### Template

```html
<!-- Estrutura básica -->
<div class="container d-flex flex-column gap-lg">
  <!-- Header -->
  <header class="d-flex justify-between align-center py-lg">
    <h1 class="text-2xl font-bold">{{ titulo() }}</h1>
    <button class="btn btn--primary" (click)="aoAdicionar()">
      Novo Item
    </button>
  </header>

  <!-- Loading -->
  @if (isLoading()) {
    <div class="d-flex justify-center align-center p-2xl">
      <app-loading-spinner></app-loading-spinner>
    </div>
  }

  <!-- Conteúdo -->
  @if (!isLoading() && itens().length > 0) {
    <div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))">
      @for (item of itens(); track item.id) {
        <div class="card card--elevated" (click)="selecionarItem(item)">
          <h3 class="text-lg font-semibold mb-md">{{ item.nome }}</h3>
          <p class="text-secondary text-sm">{{ item.descricao }}</p>
        </div>
      }
    </div>
  }

  <!-- Empty State -->
  @if (!isLoading() && itens().length === 0) {
    <div class="empty-state">
      <svg class="empty-state__icon" viewBox="0 0 24 24">
        <!-- Ícone SVG -->
      </svg>
      <h3 class="empty-state__title">Nenhum item encontrado</h3>
      <p class="empty-state__description">Clique em "Novo Item" para começar</p>
    </div>
  }
</div>
```

## 3. SERVICES

### Padrão de Service

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_ENDPOINTS, API_CONFIG } from '../constants/app.constants';
import { ICliente, IApiResponse, IApiPaginatedResponse } from '../types/common.types';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly apiUrl = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.CLIENTES.LIST}`;
  private clientesSubject = new BehaviorSubject<ICliente[]>([]);
  public clientes$ = this.clientesSubject.asObservable();

  constructor(private http: HttpClient) {}

  // GET - Lista com paginação
  listar(page: number = 1, pageSize: number = 10, filtro?: string): Observable<IApiPaginatedResponse<ICliente>> {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('pageSize', pageSize.toString());
    if (filtro) params = params.set('search', filtro);

    return this.http.get<IApiPaginatedResponse<ICliente>>(this.apiUrl, { params }).pipe(
      tap(response => this.clientesSubject.next(response.data)),
      catchError(this.handleError)
    );
  }

  // GET - Detalhe
  obterPorId(id: string): Observable<IApiResponse<ICliente>> {
    return this.http.get<IApiResponse<ICliente>>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // POST - Criar
  criar(cliente: Omit<ICliente, 'id' | 'createdAt' | 'updatedAt'>): Observable<IApiResponse<ICliente>> {
    return this.http.post<IApiResponse<ICliente>>(this.apiUrl, cliente).pipe(
      tap(response => {
        if (response.data) {
          this.clientesSubject.next([...this.clientesSubject.value, response.data]);
        }
      }),
      catchError(this.handleError)
    );
  }

  // PUT - Atualizar
  atualizar(id: string, cliente: Partial<ICliente>): Observable<IApiResponse<ICliente>> {
    return this.http.put<IApiResponse<ICliente>>(`${this.apiUrl}/${id}`, cliente).pipe(
      tap(response => {
        if (response.data) {
          const clientes = this.clientesSubject.value.map(c =>
            c.id === id ? response.data! : c
          );
          this.clientesSubject.next(clientes);
        }
      }),
      catchError(this.handleError)
    );
  }

  // DELETE
  deletar(id: string): Observable<IApiResponse<void>> {
    return this.http.delete<IApiResponse<void>>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const clientes = this.clientesSubject.value.filter(c => c.id !== id);
        this.clientesSubject.next(clientes);
      }),
      catchError(this.handleError)
    );
  }

  // Métodos auxiliares
  private handleError(error: any) {
    console.error('Erro na requisição:', error);
    return throwError(() => ({
      status: error.status,
      message: error.error?.message || 'Erro ao realizar operação'
    }));
  }
}
```

## 4. FORMS (Reactive Forms)

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, CommonModule } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { validarEmail } from '../utils/validators.utils';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss'
})
export class ClienteFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) {
    this.initForm();
  }

  ngOnInit(): void {}

  private initForm(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, validarEmail]],
      telefone: ['', [Validators.required]],
      cpfCnpj: ['', [Validators.required]],
      endereco: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.marcarCamposComoTocados();
      return;
    }

    this.isSubmitting = true;
    this.clienteService.criar(this.form.value).subscribe({
      next: () => {
        this.form.reset();
        this.isSubmitting = false;
        // Notificação de sucesso
      },
      error: (erro) => {
        console.error('Erro ao salvar:', erro);
        this.isSubmitting = false;
        // Notificação de erro
      }
    });
  }

  private marcarCamposComoTocados(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    if (field.errors['required']) return 'Campo obrigatório';
    if (field.errors['minlength']) return `Mínimo de ${field.errors['minlength'].requiredLength} caracteres`;
    if (field.errors['email']) return 'Email inválido';

    return 'Campo inválido';
  }
}
```

### Template Form

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()" class="form d-flex flex-column gap-lg">
  <div class="form-group">
    <label class="form-label" for="nome">Nome</label>
    <input 
      type="text"
      id="nome"
      class="form-input"
      formControlName="nome"
      placeholder="Digite o nome completo"
    />
    @if (form.get('nome')?.touched && form.get('nome')?.invalid) {
      <p class="form-error">{{ getErrorMessage('nome') }}</p>
    }
  </div>

  <div class="form-group">
    <label class="form-label" for="email">Email</label>
    <input 
      type="email"
      id="email"
      class="form-input"
      formControlName="email"
      placeholder="seu@email.com"
    />
    @if (form.get('email')?.touched && form.get('email')?.invalid) {
      <p class="form-error">{{ getErrorMessage('email') }}</p>
    }
  </div>

  <div class="d-flex gap-lg">
    <button type="submit" class="btn btn--primary" [disabled]="isSubmitting">
      {{ isSubmitting ? 'Salvando...' : 'Salvar' }}
    </button>
    <button type="button" class="btn btn--secondary" (click)="form.reset()">
      Cancelar
    </button>
  </div>
</form>
```

## 5. ROUTING

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'ordens-servico',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/ordens-servico/ordens-servico.routes').then(m => m.ORDENS_SERVICO_ROUTES)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
```

## 6. NOMEAÇÃO DE VARIÁVEIS

### Boas Práticas

```typescript
// ✅ Bom
const usuarioAtivo = true;
const dataEntrada = new Date();
const totalFaturamento = 1500.00;
const clientesFiltrados: ICliente[] = [];

// ❌ Evitar
const flag = true;
const data = new Date();
const total = 1500.00;
const arr = [];
const x = 10;
```

### Signals

```typescript
// ✅ Bom - nomes descritivos
const usuariosCarregando = signal(false);
const clientesSelecionados = signal<string[]>([]);
const erroCarregamento = signal<string | null>(null);

// Computed
const totalClientes = computed(() => clientesSelecionados().length);
```

## 7. COMENTÁRIOS & DOCUMENTAÇÃO

```typescript
// ✅ Comentário de função com JSDoc
/**
 * Formata um valor numérico para moeda brasileira
 * @param valor - Valor a ser formatado
 * @param decimais - Número de casas decimais (padrão: 2)
 * @returns String formatada (ex: R$ 1.234,56)
 * @example
 * formatarMoeda(1234.56) // "R$ 1.234,56"
 */
export function formatarMoeda(valor: number, decimais: number = 2): string {
  // Implementação...
}

// ✅ Comentário inline explicativo
// Filtra apenas clientes ativos para não sobrecarregar a lista
const clientesAtivos = clientes.filter(c => c.status === 'ativo');

// ❌ Comentário óbvio (evitar)
const x = 5; // Define x como 5
```

## 8. TRATAMENTO DE ERROS

```typescript
// ✅ Bom padrão
carregarDados(): void {
  this.isLoading.set(true);

  this.service.getDados().subscribe({
    next: (dados) => {
      this.itens.set(dados);
      this.notificacao.sucesso('Dados carregados com sucesso!');
    },
    error: (erro) => {
      console.error('Erro ao carregar dados:', erro);
      this.erro.set(erro.message || 'Erro desconhecido');
      this.notificacao.erro('Não foi possível carregar os dados');
    },
    complete: () => {
      this.isLoading.set(false);
    }
  });
}
```

## 9. CSS/SCSS

### Nomeação BEM (Block Element Modifier)

```scss
// ✅ Bom
.card {
  padding: $spacing-lg;
  border: 1px solid $color-border;

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: $spacing-md;
  }

  &__title {
    @include heading-style($font-size-lg);
  }

  &__content {
    padding: $spacing-md 0;
  }

  &--elevated {
    box-shadow: $shadow-md;
  }

  &--kpi {
    @include border-accent-left;
  }
}

// Uso no template
<div class="card card--elevated">
  <div class="card__header">
    <h3 class="card__title">Título</h3>
  </div>
  <div class="card__content">
    Conteúdo...
  </div>
</div>
```

## 10. GIT COMMITS

### Padrão Conventional Commits

```bash
feat: nova feature
fix: correção de bug
docs: mudanças em documentação
style: formatação, semicolons, etc
refactor: refatoração de código
perf: melhoria de performance
test: adição de testes
chore: atualizações de dependências
ci: alterações em CI/CD
revert: revert de commit anterior

# Exemplos
git commit -m "feat: adicionar módulo de dashboard com KPIs"
git commit -m "fix: corrigir cálculo de faturamento no dashboard"
git commit -m "refactor: extrair lógica de formatação para utilitário"
```

## 11. TESTES (Jasmine/Karma)

```typescript
describe('MeuComponenteComponent', () => {
  let component: MeuComponenteComponent;
  let fixture: ComponentFixture<MeuComponenteComponent>;
  let mockService: jasmine.SpyObj<MeuService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('MeuService', ['getDados']);

    await TestBed.configureTestingModule({
      imports: [MeuComponenteComponent],
      providers: [{ provide: MeuService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(MeuComponenteComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar dados ao inicializar', () => {
    mockService.getDados.and.returnValue(of([{ id: '1', nome: 'Teste' }]));

    fixture.detectChanges();

    expect(mockService.getDados).toHaveBeenCalled();
    expect(component.itens().length).toBe(1);
  });
});
```

---

**Última atualização**: Maio 2026
