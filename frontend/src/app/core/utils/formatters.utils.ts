// ============================================================
// OFICINA VICENTE LOUREIRO - UTILITIES
// ============================================================

import { DATE_FORMAT, DATETIME_FORMAT, TIME_FORMAT, CURRENCY_CONFIG, OS_STATUS_MAP } from './constants/app.constants';

/**
 * Formata um valor numérico para moeda brasileira (Real)
 * @param value - Valor numérico
 * @returns String formatada (ex: R$ 1.234,56)
 */
export function formatarMoeda(value: number | null | undefined): string {
  if (value === null || value === undefined) return 'R$ 0,00';

  return new Intl.NumberFormat(CURRENCY_CONFIG.LOCALE, {
    style: 'currency',
    currency: CURRENCY_CONFIG.CURRENCY,
    minimumFractionDigits: CURRENCY_CONFIG.DECIMAL_PLACES,
    maximumFractionDigits: CURRENCY_CONFIG.DECIMAL_PLACES
  }).format(value);
}

/**
 * Formata uma data para o padrão dd/mm/yyyy
 * @param date - Data
 * @returns String formatada (ex: 15/05/2026)
 */
export function formatarData(date: Date | string | null | undefined): string {
  if (!date) return '';

  const d = typeof date === 'string' ? new Date(date) : date;

  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

/**
 * Formata uma data com hora para dd/mm/yyyy HH:mm
 * @param date - Data
 * @returns String formatada (ex: 15/05/2026 14:30)
 */
export function formatarDataHora(date: Date | string | null | undefined): string {
  if (!date) return '';

  const d = typeof date === 'string' ? new Date(date) : date;

  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();
  const hora = String(d.getHours()).padStart(2, '0');
  const minuto = String(d.getMinutes()).padStart(2, '0');

  return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
}

/**
 * Formata apenas a hora no formato HH:mm
 * @param date - Data
 * @returns String formatada (ex: 14:30)
 */
export function formatarHora(date: Date | string | null | undefined): string {
  if (!date) return '';

  const d = typeof date === 'string' ? new Date(date) : date;

  const hora = String(d.getHours()).padStart(2, '0');
  const minuto = String(d.getMinutes()).padStart(2, '0');

  return `${hora}:${minuto}`;
}

/**
 * Formata número de OS com prefixo # e 4 dígitos
 * @param numero - Número da OS
 * @returns String formatada (ex: #0001)
 */
export function formatarNumeroOS(numero: number): string {
  return `#${String(numero).padStart(4, '0')}`;
}

/**
 * Formata um percentual
 * @param value - Valor decimal (ex: 0.85 = 85%)
 * @param decimais - Número de casas decimais
 * @returns String formatada (ex: 85%)
 */
export function formatarPercentual(value: number, decimais: number = 0): string {
  return `${(value * 100).toFixed(decimais)}%`;
}

/**
 * Formata uma quantidade com separadores de milhar
 * @param value - Valor numérico
 * @param decimais - Número de casas decimais
 * @returns String formatada (ex: 1.234,56)
 */
export function formatarQuantidade(value: number | null | undefined, decimais: number = 2): string {
  if (value === null || value === undefined) return '0';

  return new Intl.NumberFormat(CURRENCY_CONFIG.LOCALE, {
    minimumFractionDigits: decimais,
    maximumFractionDigits: decimais
  }).format(value);
}

/**
 * Formata um telefone no padrão brasileiro
 * @param telefone - String com números
 * @returns String formatada (ex: (21) 98765-4321)
 */
export function formatarTelefone(telefone: string): string {
  const numeros = telefone.replace(/\D/g, '');

  if (numeros.length === 11) {
    return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 7)}-${numeros.substring(7)}`;
  }

  if (numeros.length === 10) {
    return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 6)}-${numeros.substring(6)}`;
  }

  return telefone;
}

/**
 * Formata CPF no padrão 000.000.000-00
 * @param cpf - String com números
 * @returns String formatada
 */
export function formatarCPF(cpf: string): string {
  const numeros = cpf.replace(/\D/g, '');

  if (numeros.length === 11) {
    return `${numeros.substring(0, 3)}.${numeros.substring(3, 6)}.${numeros.substring(6, 9)}-${numeros.substring(9)}`;
  }

  return cpf;
}

/**
 * Formata CNPJ no padrão 00.000.000/0000-00
 * @param cnpj - String com números
 * @returns String formatada
 */
export function formatarCNPJ(cnpj: string): string {
  const numeros = cnpj.replace(/\D/g, '');

  if (numeros.length === 14) {
    return `${numeros.substring(0, 2)}.${numeros.substring(2, 5)}.${numeros.substring(5, 8)}/${numeros.substring(8, 12)}-${numeros.substring(12)}`;
  }

  return cnpj;
}

/**
 * Formata placa de veículo
 * @param placa - String
 * @returns String formatada (ex: ABC1234 ou ABC1D23)
 */
export function formatarPlaca(placa: string): string {
  const valor = placa.toUpperCase().replace(/[^A-Z0-9]/g, '');

  if (valor.length === 7) {
    if (/^[A-Z]{3}\d[A-Z]\d{2}$/.test(valor)) {
      // Placa Mercosul: ABC1D23
      return `${valor.substring(0, 4)}-${valor.substring(4)}`;
    } else {
      // Placa tradicional: ABC1234
      return `${valor.substring(0, 3)}-${valor.substring(3)}`;
    }
  }

  return valor;
}

/**
 * Obter label do status de OS
 * @param status - Status da OS
 * @returns Label formatado
 */
export function getOSStatusLabel(status: string): string {
  return OS_STATUS_MAP[status as keyof typeof OS_STATUS_MAP]?.label || status;
}

/**
 * Obter informações de cor do status de OS
 * @param status - Status da OS
 * @returns Objeto com cores e estilos
 */
export function getOSStatusStyle(status: string) {
  return OS_STATUS_MAP[status as keyof typeof OS_STATUS_MAP] || {
    label: status,
    color: '#F5F5F5',
    bgColor: '#171717',
    borderColor: 'rgba(255,255,255,0.07)',
    className: ''
  };
}

/**
 * Trunca uma string e adiciona reticências
 * @param text - Texto
 * @param length - Comprimento máximo
 * @returns String truncada
 */
export function truncarTexto(text: string | null | undefined, length: number = 50): string {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

/**
 * Valida email
 * @param email - Email
 * @returns True se válido
 */
export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida CPF
 * @param cpf - String com números ou formatado
 * @returns True se válido
 */
export function validarCPF(cpf: string): boolean {
  const numeros = cpf.replace(/\D/g, '');

  if (numeros.length !== 11) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(numeros)) return false;

  // Calcula primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(numeros.charAt(i)) * (10 - i);
  }
  let digito1 = 11 - (soma % 11);
  digito1 = digito1 >= 10 ? 0 : digito1;

  if (parseInt(numeros.charAt(9)) !== digito1) return false;

  // Calcula segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(numeros.charAt(i)) * (11 - i);
  }
  let digito2 = 11 - (soma % 11);
  digito2 = digito2 >= 10 ? 0 : digito2;

  if (parseInt(numeros.charAt(10)) !== digito2) return false;

  return true;
}

/**
 * Valida placa de veículo
 * @param placa - String
 * @returns True se válida
 */
export function validarPlaca(placa: string): boolean {
  const valor = placa.toUpperCase().replace(/[^A-Z0-9]/g, '');

  // Placa tradicional: ABC1234
  if (/^[A-Z]{3}\d{4}$/.test(valor)) return true;

  // Placa Mercosul: ABC1D23
  if (/^[A-Z]{3}\d[A-Z]\d{2}$/.test(valor)) return true;

  return false;
}

/**
 * Calcula a idade baseado na data de nascimento
 * @param dataNascimento - Data de nascimento
 * @returns Idade em anos
 */
export function calcularIdade(dataNascimento: Date | string): number {
  const data = typeof dataNascimento === 'string' ? new Date(dataNascimento) : dataNascimento;
  const hoje = new Date();
  let idade = hoje.getFullYear() - data.getFullYear();
  const mes = hoje.getMonth() - data.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < data.getDate())) {
    idade--;
  }

  return idade;
}

/**
 * Calcula dias até uma data
 * @param data - Data futura
 * @returns Número de dias
 */
export function calcularDiasAte(data: Date | string): number {
  const dataFutura = typeof data === 'string' ? new Date(data) : data;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  dataFutura.setHours(0, 0, 0, 0);

  const diferenca = dataFutura.getTime() - hoje.getTime();
  return Math.ceil(diferenca / (1000 * 60 * 60 * 24));
}

/**
 * Formata uma diferença de tempo em texto legível
 * @param data - Data passada ou futura
 * @returns String formatada (ex: "há 2 horas", "em 3 dias")
 */
export function formatarDiferençaTempo(data: Date | string): string {
  const dataRef = typeof data === 'string' ? new Date(data) : data;
  const agora = new Date();
  const diferenca = Math.abs(agora.getTime() - dataRef.getTime());

  const segundos = Math.floor(diferenca / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  const meses = Math.floor(dias / 30);
  const anos = Math.floor(meses / 12);

  const ehFuturo = dataRef > agora;

  if (anos > 0) return ehFuturo ? `em ${anos} ano${anos > 1 ? 's' : ''}` : `há ${anos} ano${anos > 1 ? 's' : ''}`;
  if (meses > 0) return ehFuturo ? `em ${meses} mês${meses > 1 ? 'es' : ''}` : `há ${meses} mês${meses > 1 ? 'es' : ''}`;
  if (dias > 0) return ehFuturo ? `em ${dias} dia${dias > 1 ? 's' : ''}` : `há ${dias} dia${dias > 1 ? 's' : ''}`;
  if (horas > 0) return ehFuturo ? `em ${horas} hora${horas > 1 ? 's' : ''}` : `há ${horas} hora${horas > 1 ? 's' : ''}`;
  if (minutos > 0) return ehFuturo ? `em ${minutos} minuto${minutos > 1 ? 's' : ''}` : `há ${minutos} minuto${minutos > 1 ? 's' : ''}`;

  return 'agora mesmo';
}

/**
 * Gera uma cor baseado em um hash de string
 * @param str - String para hash
 * @returns Cor em formato hex
 */
export function gerarCorDeString(str: string): string {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  const color = Math.abs(hash).toString(16);
  return '#' + Array(7 - color.length).fill(0).join('') + color;
}

/**
 * Cria um slug a partir de um texto
 * @param text - Texto
 * @returns Slug
 */
export function criarSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
