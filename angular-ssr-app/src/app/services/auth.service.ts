import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string }>('/api/login', { username, password })
      .pipe(tap(res => localStorage.setItem(this.tokenKey, res.token)));
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getSuggestion(errorMessage: string): Observable<string> {
    return this.http.post<{ suggestion: string }>('/api/ai-suggest', { errorMessage })
      .pipe(map(res => res.suggestion));
  }
}
