import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private _user = signal<AuthUser | null>(null);
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._user());

  login(email: string, password: string) {
    return this.http.post<{ success: boolean; token: string; user: AuthUser }>(
      '/api/auth/login',
      { email, password }
    ).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this._user.set(res.user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  loadCurrentUser() {
    return this.http.get<{ success: boolean; data: AuthUser }>('/api/auth/me').pipe(
      tap(res => this._user.set(res.data))
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
