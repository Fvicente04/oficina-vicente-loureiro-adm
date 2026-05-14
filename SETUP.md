# OFICINA VICENTE LOUREIRO — SETUP E CONFIGURAÇÃO INICIAL

## 1. PRÉ-REQUISITOS

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v18+ recomendado) - [Download](https://nodejs.org/)
- **npm** ou **yarn** (geralmente vem com Node.js)
- **PostgreSQL** (v12+) - [Download](https://www.postgresql.org/)
- **Git** - [Download](https://git-scm.com/)
- **VS Code** (recomendado) - [Download](https://code.visualstudio.com/)

## 2. CONFIGURAÇÃO INICIAL

### 2.1 Clonar/Criar Repositório

```bash
# Navegar até o diretório do projeto
cd c:\Users\patri\oficina-gestao

# Inicializar git (se ainda não estiver)
git init
git add .
git commit -m "Initial commit: project structure and design system"
```

### 2.2 Instalar Dependências Globais

```bash
# Angular CLI
npm install -g @angular/cli@19

# Sequelize CLI (para backend)
npm install -g sequelize-cli
```

## 3. SETUP DO FRONTEND

### 3.1 Criar projeto Angular 19

```bash
cd frontend

# Se não tiver ng instalado
npm install -g @angular/cli@19

# Criar novo projeto (ou usar um existente)
ng new . --routing --style=scss --skip-git --standalone

# Instalar dependências
npm install

# Dependências adicionais necessárias
npm install chart.js ng2-charts
npm install @angular/animations
npm install rxjs tslib zone.js
```

### 3.2 Configurar tsconfig.json

O arquivo `tsconfig.json` já está criado com path aliases:
- `@/*` → `frontend/src/*`
- `@app/*` → `frontend/src/app/*`
- `@core/*` → `frontend/src/app/core/*`
- `@shared/*` → `frontend/src/app/shared/*`
- `@modules/*` → `frontend/src/app/modules/*`
- `@assets/*` → `frontend/src/assets/*`

### 3.3 Configurar angular.json

Editar `angular.json` para importar estilos globais:

```json
{
  "projects": {
    "oficina-gestao": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "src/assets/styles/global.scss"
            ],
            "scripts": []
          }
        }
      }
    }
  }
}
```

### 3.4 Instalar Fonts do Google

No arquivo `src/index.html`, adicionar:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 3.5 Criar main.ts

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideAnimations()
  ]
});
```

### 3.6 Testar Frontend

```bash
# Na pasta frontend/
ng serve

# Acessar em http://localhost:4200
```

## 4. SETUP DO BACKEND

### 4.1 Inicializar Node.js

```bash
cd backend

# Criar package.json
npm init -y

# Instalar dependências base
npm install express cors dotenv bcryptjs jsonwebtoken uuid
npm install sequelize pg pg-hstore

# Dev dependencies
npm install -D typescript ts-node @types/express @types/node nodemon
npm install -D sequelize-cli
```

### 4.2 Estrutura de Pastas Backend

```bash
mkdir -p src/{models,controllers,routes,middleware,services,utils}
mkdir migrations seeders config
```

### 4.3 Configurar .env

Copiar `.env.example` para `.env` e preencher as variáveis:

```bash
cp .env.example .env
```

Editar `.env` com dados locais:
```
DB_HOST=localhost
DB_USER=oficina_user
DB_PASSWORD=sua_senha
DB_NAME=oficina_gestao
JWT_SECRET=sua_chave_super_segura_aqui_32_caracteres_minimo
```

### 4.4 Criar package.json scripts

Editar `package.json` e adicionar scripts:

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "db:migrate": "sequelize-cli db:migrate",
    "db:migrate:undo": "sequelize-cli db:migrate:undo",
    "db:seed": "sequelize-cli db:seed:all",
    "db:seed:undo": "sequelize-cli db:seed:undo:all"
  }
}
```

### 4.5 Configurar TypeScript

Criar `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 5. BANCO DE DADOS

### 5.1 Criar Usuário e Banco PostgreSQL

```bash
# Windows (PowerShell)
$env:PGPASSWORD="sua_senha"
psql -U postgres -h localhost

# No prompt SQL:
CREATE USER oficina_user WITH PASSWORD 'sua_senha_aqui';
CREATE DATABASE oficina_gestao OWNER oficina_user;

# Dar permissões
GRANT ALL PRIVILEGES ON DATABASE oficina_gestao TO oficina_user;
\q
```

### 5.2 Criar Models Sequelize

Ver arquivo de schema do banco no README.md

## 6. ESTRUTURA DE DIRETÓRIOS FINAL

```
oficina-gestao/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/
│   │   │   │   ├── auth/
│   │   │   │   ├── guards/
│   │   │   │   ├── interceptors/
│   │   │   │   ├── constants/
│   │   │   │   ├── types/
│   │   │   │   └── utils/
│   │   │   ├── layouts/
│   │   │   ├── modules/
│   │   │   ├── shared/
│   │   │   └── app.routes.ts
│   │   ├── assets/
│   │   │   └── styles/
│   │   ├── main.ts
│   │   └── index.html
│   ├── angular.json
│   ├── tsconfig.json
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── utils/
│   │   └── index.ts
│   ├── migrations/
│   ├── seeders/
│   ├── config/
│   ├── .env.example
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── .editorconfig
├── README.md
├── CODING_STANDARDS.md
└── SETUP.md (este arquivo)
```

## 7. VARIÁVEIS DE AMBIENTE

### Frontend
Criar `frontend/src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3001/api'
};
```

### Backend
Já criado `backend/.env.example`

## 8. EXECUTAR APLICAÇÃO

### Terminal 1 - Backend
```bash
cd backend
npm install
cp .env.example .env  # Editar conforme necessário
npm run dev
```

Backend rodando em: `http://localhost:3001`

### Terminal 2 - Frontend
```bash
cd frontend
npm install
ng serve
```

Frontend rodando em: `http://localhost:4200`

## 9. EXTENSÕES VS CODE RECOMENDADAS

- Angular Language Service
- Prettier - Code formatter
- ESLint
- SCSS IntelliSense
- Thunder Client ou REST Client
- PostgreSQL Explorer
- Material Icon Theme
- One Dark Pro (tema)

## 10. GIT WORKFLOW

```bash
# Clonar repo
git clone <repo-url>
cd oficina-gestao

# Criar branch para feature
git checkout -b feature/nome-da-feature

# Fazer commits
git commit -m "feat: descrição da feature"

# Push
git push origin feature/nome-da-feature

# Pull request no GitHub/GitLab

# Merge na main
git checkout main
git merge feature/nome-da-feature
```

## 11. PRÓXIMOS PASSOS

1. ✅ Setup estrutura de pastas
2. ✅ Design System SCSS
3. [ ] Setup Angular 19 completo
4. [ ] Setup Express + Sequelize
5. [ ] Criar models do banco
6. [ ] Layout base (Sidebar + Topbar)
7. [ ] Sistema de autenticação
8. [ ] Dashboard com KPIs
9. [ ] Módulos do sistema

## 12. TROUBLESHOOTING

### Erro: "comando ng não encontrado"
```bash
npm install -g @angular/cli@19
```

### Erro: "Cannot find module..."
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

### Erro: Banco de dados
```bash
# Verificar conexão PostgreSQL
psql -U oficina_user -d oficina_gestao -h localhost

# Reset banco
DROP DATABASE oficina_gestao;
CREATE DATABASE oficina_gestao OWNER oficina_user;
```

---

**Última atualização**: Maio 2026
