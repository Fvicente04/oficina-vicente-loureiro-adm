import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  template: `
    <div class="login-container">
      <div class="login-box">
        <div class="login-logo">
          <span>OFICINA</span>
          <span class="accent">VICENTE</span>
          <span>LOUREIRO</span>
          <small>SISTEMA DE GESTÃO</small>
        </div>
        <button class="btn btn--primary btn--full" (click)="entrar()">
          Entrar (dev)
        </button>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      background: #080808;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .login-box {
      width: 320px;
      padding: 40px;
      background: #111111;
      border: 1px solid rgba(255,255,255,0.07);
    }
    .login-logo {
      display: flex;
      flex-direction: column;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 28px;
      letter-spacing: 0.05em;
      color: #F5F5F5;
      margin-bottom: 32px;
      line-height: 1;
      .accent { color: #D4001A; }
      small {
        font-size: 10px;
        letter-spacing: 0.1em;
        color: rgba(255,255,255,0.4);
        margin-top: 4px;
      }
    }
  `]
})
export class LoginComponent {
  private router = inject(Router);

  entrar(): void {
    this.router.navigate(['/dashboard']);
  }
}
