// ============================================================
// OFICINA VICENTE LOUREIRO - COMMON TYPES & INTERFACES
// ============================================================

// ============================================================
// ENUMS
// ============================================================

export enum UserRole {
  ADMIN = 'admin',
  MECANICO = 'mecanico',
  RECEPCAO = 'recepcao'
}

export enum OSStatus {
  ABERTA = 'aberta',
  EM_ANDAMENTO = 'em_andamento',
  AGUARDANDO_PECA = 'aguardando_peca',
  CONCLUIDA = 'concluida',
  CANCELADA = 'cancelada'
}

export enum EstoqueMovimento {
  ENTRADA = 'entrada',
  SAIDA = 'saida'
}

export enum FinanceiroTipo {
  RECEITA = 'receita',
  DESPESA = 'despesa'
}

export enum FinanceiroStatus {
  PENDENTE = 'pendente',
  PAGO = 'pago',
  VENCIDO = 'vencido'
}

export enum OSItemTipo {
  SERVICO = 'servico',
  PECA = 'peca'
}

// ============================================================
// INTERFACES
// ============================================================

// Auth
export interface IUsuario {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  user: IUsuario;
  token: string;
  expiresIn: number;
}

// Clientes
export interface ICliente {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  cpfCnpj: string;
  endereco: string;
  createdAt: Date;
  updatedAt: Date;
}

// Veículos
export interface IVeiculo {
  id: string;
  clienteId: string;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  cor: string;
  observacoes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVeiculoComCliente extends IVeiculo {
  cliente: ICliente;
}

// Ordens de Serviço
export interface IOrdemServico {
  id: string;
  numero: number; // Formato: 0001, 0002, etc (no display: #0001)
  veiculoId: string;
  clienteId: string;
  descricaoProblema: string;
  status: OSStatus;
  dataEntrada: Date;
  dataPrevisao?: Date;
  dataConclusao?: Date;
  valorTotal: number;
  observacoes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrdemServicoComRelacoes extends IOrdemServico {
  veiculo: IVeiculo;
  cliente: ICliente;
  itens?: IOSItem[];
}

export interface IOSItem {
  id: string;
  osId: string;
  tipo: OSItemTipo;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

// Estoque
export interface IEstoque {
  id: string;
  nome: string;
  categoria: string;
  unidade: string;
  quantidadeAtual: number;
  quantidadeMinima: number;
  valorUnitario: number;
  fornecedor?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEstoqueMovimentacao {
  id: string;
  estoqueId: string;
  osId?: string; // Nullable
  tipo: EstoqueMovimento;
  quantidade: number;
  motivo: string;
  createdAt: Date;
}

// Financeiro
export interface IFinanceiro {
  id: string;
  osId?: string; // Nullable
  tipo: FinanceiroTipo;
  descricao: string;
  valor: number;
  status: FinanceiroStatus;
  dataVencimento: Date;
  dataPagamento?: Date;
  categoria: string;
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard
export interface IKPIData {
  titulo: string;
  valor: number | string;
  formatado: string;
  tendencia?: 'up' | 'down' | 'stable';
  percentualMudanca?: number;
  icone?: string;
}

export interface IDashboardKPIs {
  faturamentoMes: IKPIData;
  osAbertas: IKPIData;
  veiculosPatino: IKPIData;
  aReceber: IKPIData;
}

export interface IFaturamentoMensal {
  mes: string;
  valor: number;
}

export interface IOSRecente {
  id: string;
  numero: number;
  placa: string;
  descricaoProblema: string;
  status: OSStatus;
  valorTotal: number;
  dataEntrada: Date;
}

export interface IEstoqueCritico {
  id: string;
  nome: string;
  quantidadeAtual: number;
  quantidadeMinima: number;
  percentualDisponibilidade: number;
}

// ============================================================
// RESPONSE TYPES
// ============================================================

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface IApiPaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================================
// FORMS
// ============================================================

export interface IClienteFormData {
  nome: string;
  telefone: string;
  email?: string;
  cpfCnpj: string;
  endereco: string;
}

export interface IVeiculoFormData {
  clienteId: string;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  cor: string;
  observacoes?: string;
}

export interface IOrdemServicoFormData {
  veiculoId: string;
  clienteId: string;
  descricaoProblema: string;
  dataPrevisao?: Date;
  observacoes?: string;
}

export interface IEstoqueFormData {
  nome: string;
  categoria: string;
  unidade: string;
  quantidadeMinima: number;
  valorUnitario: number;
  fornecedor?: string;
}
