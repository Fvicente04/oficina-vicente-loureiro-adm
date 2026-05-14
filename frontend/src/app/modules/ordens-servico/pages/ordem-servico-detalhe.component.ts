// ============================================================
// EXEMPLO: COMPONENTE DE DETALHE DE ORDEM DE SERVIÇO
// Demonstra uso de Signals, Standalone Components, 
// Reactive Forms e boas práticas
// ============================================================

import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  computed,
  input,
  output,
  inject
} from '@angular/core';
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  DecimalPipe
} from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { IOrdemServicoComRelacoes, OSStatus } from '../../../core/types/common.types';
import { OrdemServicoService } from '../services/ordem-servico.service';
import { formatarData, formatarMoeda, getOSStatusLabel } from '../../../core/utils/formatters.utils';
import { OS_STATUS_MAP } from '../../../core/constants/app.constants';

@Component({
  selector: 'app-ordem-servico-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrencyPipe,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './ordem-servico-detalhe.component.html',
  styleUrl: './ordem-servico-detalhe.component.scss'
})
export class OrdemServicoDetalheComponent implements OnInit, OnDestroy {
  // ============================================================
  // INJEÇÕES DE DEPENDÊNCIA
  // ============================================================

  private readonly osService = inject(OrdemServicoService);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly destroy$ = new Subject<void>();

  // ============================================================
  // SINAIS (Estado Reativo)
  // ============================================================

  /** Ordem de Serviço carregada */
  os = signal<IOrdemServicoComRelacoes | null>(null);

  /** Estado de carregamento */
  isLoading = signal(false);

  /** Modo de edição */
  isEditando = signal(false);

  /** Estado de submissão */
  isSubmitting = signal(false);

  /** Erro ao carregar */
  erro = signal<string | null>(null);

  // ============================================================
  // SINAIS COMPUTADOS (Derivados)
  // ============================================================

  /** Label do status formatado */
  statusLabel = computed(() =>
    this.os()?.status ? getOSStatusLabel(this.os()!.status) : ''
  );

  /** Cores do status */
  statusStyle = computed(() =>
    this.os()?.status ? OS_STATUS_MAP[this.os()!.status as keyof typeof OS_STATUS_MAP] : null
  );

  /** Data de entrada formatada */
  dataEntradaFormatada = computed(() =>
    this.os()?.dataEntrada ? formatarData(this.os()!.dataEntrada) : ''
  );

  /** Data de conclusão formatada */
  dataConclusaoFormatada = computed(() =>
    this.os()?.dataConclusao ? formatarData(this.os()!.dataConclusao) : 'Não concluída'
  );

  /** Valor total formatado */
  valorTotalFormatado = computed(() =>
    this.os()?.valorTotal ? formatarMoeda(this.os()!.valorTotal) : 'R$ 0,00'
  );

  /** Total de itens */
  totalItens = computed(() => this.os()?.itens?.length || 0);

  /** Pode ser editada? */
  podeEditar = computed(() => {
    const status = this.os()?.status;
    return status !== 'concluida' && status !== 'cancelada';
  });

  // ============================================================
  // OUTPUTS (Eventos)
  // ============================================================

  osAtualizada = output<IOrdemServicoComRelacoes>();
  oscancelada = output<string>();

  // ============================================================
  // PROPERTIES
  // ============================================================

  form!: FormGroup;
  readonly formatarMoeda = formatarMoeda;
  readonly getOSStatusLabel = getOSStatusLabel;

  // ============================================================
  // LIFECYCLE HOOKS
  // ============================================================

  ngOnInit(): void {
    this.inicializarForm();
    this.carregarOS();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ============================================================
  // MÉTODOS PÚBLICOS
  // ============================================================

  /**
   * Ativa modo de edição
   */
  ativarEdicao(): void {
    if (this.podeEditar()) {
      this.isEditando.set(true);
      this.preencherForm();
    }
  }

  /**
   * Cancela modo de edição
   */
  cancelarEdicao(): void {
    this.isEditando.set(false);
    this.form.reset();
  }

  /**
   * Salva alterações
   */
  salvar(): void {
    if (this.form.invalid || !this.os()) {
      this.marcarCamposComoTocados();
      return;
    }

    this.isSubmitting.set(true);

    this.osService
      .atualizar(this.os()!.id, this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resposta) => {
          if (resposta.data) {
            this.os.set(resposta.data);
            this.isEditando.set(false);
            this.osAtualizada.emit(resposta.data);
            // TODO: Mostrar notificação de sucesso
          }
          this.isSubmitting.set(false);
        },
        error: (erro) => {
          console.error('Erro ao atualizar OS:', erro);
          this.erro.set('Erro ao atualizar ordem de serviço');
          this.isSubmitting.set(false);
          // TODO: Mostrar notificação de erro
        }
      });
  }

  /**
   * Muda status da OS
   */
  mudarStatus(novoStatus: OSStatus): void {
    if (!this.os()) return;

    this.isSubmitting.set(true);

    this.osService
      .atualizarStatus(this.os()!.id, novoStatus)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resposta) => {
          if (resposta.data) {
            this.os.set(resposta.data);
            this.osAtualizada.emit(resposta.data);
            // TODO: Mostrar notificação de sucesso
          }
          this.isSubmitting.set(false);
        },
        error: (erro) => {
          console.error('Erro ao atualizar status:', erro);
          this.erro.set('Erro ao atualizar status');
          this.isSubmitting.set(false);
          // TODO: Mostrar notificação de erro
        }
      });
  }

  /**
   * Cancela a OS
   */
  cancelarOS(): void {
    if (confirm('Tem certeza que deseja cancelar esta ordem de serviço?')) {
      this.mudarStatus('cancelada');
      this.oscancelada.emit(this.os()!.id);
    }
  }

  /**
   * Obtém mensagem de erro para um campo
   */
  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    if (field.errors['required']) return 'Campo obrigatório';
    if (field.errors['minlength'])
      return `Mínimo de ${field.errors['minlength'].requiredLength} caracteres`;

    return 'Campo inválido';
  }

  /**
   * Obtém os status possíveis para transição
   */
  getStatusDisponiveis(): OSStatus[] {
    const status = this.os()?.status;

    const transicoes: Record<OSStatus, OSStatus[]> = {
      aberta: ['em_andamento', 'cancelada'],
      em_andamento: ['aguardando_peca', 'concluida', 'cancelada'],
      aguardando_peca: ['em_andamento', 'cancelada'],
      concluida: [],
      cancelada: []
    };

    return transicoes[status as OSStatus] || [];
  }

  // ============================================================
  // MÉTODOS PRIVADOS
  // ============================================================

  /**
   * Carrega a OS do servidor
   */
  private carregarOS(): void {
    this.isLoading.set(true);
    const osId = this.route.snapshot.paramMap.get('id');

    if (!osId) {
      this.erro.set('ID da ordem de serviço não encontrado');
      this.isLoading.set(false);
      return;
    }

    this.osService
      .obterPorId(osId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resposta) => {
          if (resposta.data) {
            this.os.set(resposta.data);
            this.preencherForm();
          } else {
            this.erro.set('Ordem de serviço não encontrada');
          }
          this.isLoading.set(false);
        },
        error: (erro) => {
          console.error('Erro ao carregar OS:', erro);
          this.erro.set('Erro ao carregar a ordem de serviço');
          this.isLoading.set(false);
        }
      });
  }

  /**
   * Inicializa o formulário reativo
   */
  private inicializarForm(): void {
    this.form = this.fb.group({
      descricaoProblema: ['', [Validators.required, Validators.minLength(10)]],
      observacoes: [''],
      dataPrevisao: ['', Validators.required]
    });
  }

  /**
   * Preenche o formulário com dados da OS
   */
  private preencherForm(): void {
    if (!this.os()) return;

    const data = new Date(this.os()!.dataPrevisao || '');
    const dataFormatada = data.toISOString().split('T')[0];

    this.form.patchValue({
      descricaoProblema: this.os()!.descricaoProblema,
      observacoes: this.os()!.observacoes || '',
      dataPrevisao: dataFormatada
    });
  }

  /**
   * Marca todos os campos como tocados para exibir erros
   */
  private marcarCamposComoTocados(): void {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.markAsTouched();
    });
  }
}
