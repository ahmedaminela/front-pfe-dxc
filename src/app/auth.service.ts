// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/signin'; // Update to your login endpoint

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(this.apiUrl, { username, password }) // Removed /login
      .pipe(
        tap((response) => {
          if (response && response.token) { // Update this condition based on your response structure
            localStorage.setItem('jwt_token', response.token); // Update this based on your response structure
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }
  
  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    } else {
      // Handle case where token is null
      return null;
    }
  }
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }
  
}
