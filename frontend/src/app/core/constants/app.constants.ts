// ============================================================
// OFICINA VICENTE LOUREIRO - CONSTANTS
// ============================================================

// ============================================================
// API CONFIG
// ============================================================

export const API_CONFIG = {
  BASE_URL: '/api',
  TIMEOUT: 30000,
  VERSION: 'v1'
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh'
  },
  CLIENTES: {
    LIST: '/clientes',
    CREATE: '/clientes',
    DETAIL: '/clientes/:id',
    UPDATE: '/clientes/:id',
    DELETE: '/clientes/:id'
  },
  VEICULOS: {
    LIST: '/veiculos',
    CREATE: '/veiculos',
    DETAIL: '/veiculos/:id',
    UPDATE: '/veiculos/:id',
    DELETE: '/veiculos/:id'
  },
  OS: {
    LIST: '/os',
    CREATE: '/os',
    DETAIL: '/os/:id',
    UPDATE: '/os/:id',
    DELETE: '/os/:id',
    UPDATE_STATUS: '/os/:id/status'
  },
  ESTOQUE: {
    LIST: '/estoque',
    CREATE: '/estoque',
    DETAIL: '/estoque/:id',
    UPDATE: '/estoque/:id',
    DELETE: '/estoque/:id',
    CRITICO: '/estoque/critico',
    MOVIMENTACAO: '/estoque/:id/movimentacao'
  },
  FINANCEIRO: {
    LIST: '/financeiro',
    CREATE: '/financeiro',
    DETAIL: '/financeiro/:id',
    UPDATE: '/financeiro/:id',
    DELETE: '/financeiro/:id',
    RESUMO: '/financeiro/resumo'
  },
  DASHBOARD: {
    KPIS: '/dashboard/kpis',
    FATURAMENTO: '/dashboard/faturamento-mensal',
    OS_RECENTES: '/dashboard/os-recentes',
    ESTOQUE_CRITICO: '/dashboard/estoque-critico'
  }
};

// ============================================================
// OS STATUSES
// ============================================================

export const OS_STATUS_MAP = {
  aberta: {
    label: 'Aberta',
    color: '#FFC107',
    bgColor: 'rgba(255, 193, 7, 0.12)',
    borderColor: 'rgba(255, 193, 7, 0.35)',
    className: 'badge--aberta'
  },
  em_andamento: {
    label: 'Em Andamento',
    color: '#2196F3',
    bgColor: 'rgba(33, 150, 243, 0.12)',
    borderColor: 'rgba(33, 150, 243, 0.35)',
    className: 'badge--em-andamento'
  },
  aguardando_peca: {
    label: 'Aguardando Peça',
    color: '#D4001A',
    bgColor: 'rgba(212, 0, 26, 0.12)',
    borderColor: 'rgba(212, 0, 26, 0.35)',
    className: 'badge--aguardando'
  },
  concluida: {
    label: 'Concluída',
    color: '#4CAF50',
    bgColor: 'rgba(76, 175, 80, 0.12)',
    borderColor: 'rgba(76, 175, 80, 0.35)',
    className: 'badge--concluida'
  },
  cancelada: {
    label: 'Cancelada',
    color: '#9E9E9E',
    bgColor: 'rgba(158, 158, 158, 0.12)',
    borderColor: 'rgba(158, 158, 158, 0.35)',
    className: 'badge--cancelada'
  }
};

// ============================================================
// DATE & TIME FORMATS
// ============================================================

export const DATE_FORMAT = 'dd/MM/yyyy';
export const DATETIME_FORMAT = 'dd/MM/yyyy HH:mm';
export const TIME_FORMAT = 'HH:mm';

// ============================================================
// CURRENCY FORMAT
// ============================================================

export const CURRENCY_CONFIG = {
  LOCALE: 'pt-BR',
  CURRENCY: 'BRL',
  SYMBOL: 'R$',
  DECIMAL_PLACES: 2
};

// ============================================================
// PAGINATION
// ============================================================

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50],
  DEFAULT_PAGE: 1
};

// ============================================================
// VALIDATION MESSAGES
// ============================================================

export const VALIDATION_MESSAGES = {
  REQUIRED: 'Este campo é obrigatório',
  EMAIL_INVALID: 'Email inválido',
  PASSWORD_WEAK: 'Senha deve ter no mínimo 8 caracteres',
  CONFIRM_PASSWORD: 'As senhas não correspondem',
  MIN_LENGTH: 'Mínimo de {{min}} caracteres',
  MAX_LENGTH: 'Máximo de {{max}} caracteres',
  PATTERN: 'Formato inválido',
  PHONE_INVALID: 'Telefone inválido',
  CPF_CNPJ_INVALID: 'CPF/CNPJ inválido',
  PLACA_INVALID: 'Placa inválida (ex: ABC1234)',
  DATE_INVALID: 'Data inválida',
  NUMBER_INVALID: 'Número inválido'
};

// ============================================================
// ERROR MESSAGES
// ============================================================

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conectividade. Tente novamente.',
  UNAUTHORIZED: 'Não autorizado. Faça login novamente.',
  FORBIDDEN: 'Acesso negado.',
  NOT_FOUND: 'Recurso não encontrado.',
  CONFLICT: 'Já existe um registro com esses dados.',
  SERVER_ERROR: 'Erro no servidor. Tente novamente mais tarde.',
  GENERIC_ERROR: 'Ocorreu um erro. Tente novamente.'
};

// ============================================================
// SUCCESS MESSAGES
// ============================================================

export const SUCCESS_MESSAGES = {
  CREATED: '{{entity}} criado com sucesso!',
  UPDATED: '{{entity}} atualizado com sucesso!',
  DELETED: '{{entity}} removido com sucesso!',
  SAVED: 'Salvo com sucesso!',
  LOGIN_SUCCESS: 'Login realizado com sucesso!',
  LOGOUT_SUCCESS: 'Logout realizado com sucesso!',
  OPERATION_SUCCESS: 'Operação realizada com sucesso!'
};

// ============================================================
// LOCAL STORAGE KEYS
// ============================================================

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed'
};

// ============================================================
// ROLE PERMISSIONS
// ============================================================

export const ROLE_PERMISSIONS = {
  admin: ['*'],
  mecanico: [
    'ordens-servico:view',
    'ordens-servico:edit-status',
    'clientes:view',
    'veiculos:view',
    'estoque:view'
  ],
  recepcao: [
    'ordens-servico:view',
    'ordens-servico:create',
    'clientes:view',
    'clientes:create',
    'clientes:edit',
    'veiculos:view',
    'veiculos:create',
    'financeiro:view'
  ]
};

// ============================================================
// ROUTES
// ============================================================

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  ORDENS_SERVICO: '/ordens-servico',
  ORDENS_SERVICO_NOVO: '/ordens-servico/novo',
  ORDENS_SERVICO_DETALHE: '/ordens-servico/:id',
  CLIENTES: '/clientes',
  CLIENTES_NOVO: '/clientes/novo',
  VEICULOS: '/veiculos',
  VEICULOS_NOVO: '/veiculos/novo',
  ESTOQUE: '/estoque',
  FINANCEIRO: '/financeiro',
  AGENDAMENTOS: '/agendamentos'
};

// ============================================================
// SIDEBAR MENU
// ============================================================

export const SIDEBAR_MENU = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    route: '/dashboard',
    roles: ['admin', 'mecanico', 'recepcao']
  },
  {
    id: 'ordens-servico',
    label: 'Ordens de Serviço',
    icon: 'wrench',
    route: '/ordens-servico',
    roles: ['admin', 'mecanico', 'recepcao']
  },
  {
    id: 'clientes',
    label: 'Clientes',
    icon: 'users',
    route: '/clientes',
    roles: ['admin', 'recepcao']
  },
  {
    id: 'veiculos',
    label: 'Veículos',
    icon: 'car',
    route: '/veiculos',
    roles: ['admin', 'mecanico', 'recepcao']
  },
  {
    id: 'estoque',
    label: 'Estoque',
    icon: 'box',
    route: '/estoque',
    roles: ['admin', 'mecanico']
  },
  {
    id: 'financeiro',
    label: 'Financeiro',
    icon: 'money',
    route: '/financeiro',
    roles: ['admin', 'recepcao']
  },
  {
    id: 'agendamentos',
    label: 'Agendamentos',
    icon: 'calendar',
    route: '/agendamentos',
    roles: ['admin', 'recepcao']
  }
];

// ============================================================
// CATEGORY OPTIONS
// ============================================================

export const ESTOQUE_CATEGORIES = [
  { value: 'tinta', label: 'Tinta' },
  { value: 'verniz', label: 'Verniz' },
  { value: 'primer', label: 'Primer' },
  { value: 'massa', label: 'Massa' },
  { value: 'lixa', label: 'Lixa' },
  { value: 'pano', label: 'Pano' },
  { value: 'solvente', label: 'Solvente' },
  { value: 'outros', label: 'Outros' }
];

export const FINANCEIRO_CATEGORIES = [
  { value: 'receita-os', label: 'Receita - OS' },
  { value: 'receita-outro', label: 'Receita - Outro' },
  { value: 'despesa-material', label: 'Despesa - Material' },
  { value: 'despesa-folha', label: 'Despesa - Folha' },
  { value: 'despesa-aluguel', label: 'Despesa - Aluguel' },
  { value: 'despesa-servico', label: 'Despesa - Serviço' },
  { value: 'despesa-outro', label: 'Despesa - Outro' }
];

// ============================================================
// UNITS (Estoque)
// ============================================================

export const UNITS = [
  { value: 'l', label: 'Litro (L)' },
  { value: 'ml', label: 'Mililitro (mL)' },
  { value: 'kg', label: 'Quilograma (kg)' },
  { value: 'g', label: 'Grama (g)' },
  { value: 'un', label: 'Unidade (un)' },
  { value: 'm', label: 'Metro (m)' },
  { value: 'm2', label: 'Metro Quadrado (m²)' },
  { value: 'hora', label: 'Hora' }
];

// ============================================================
// ENVIRONMENT CONFIG
// ============================================================

export const ENV_CONFIG = {
  DEBUG: false,
  LOG_REQUESTS: false,
  MOCK_API: false
};
