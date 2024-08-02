// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtPayload } from "./jwt-payload.interface"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // Reemplaza con tu URL de backend

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo usuario
  register(email: string, password: string): Observable<{ token: string }> {
    const url = `${this.apiUrl}/register`; // Endpoint de registro
    const body = { email, password };
    return this.http.post<{ token: string }>(url, body);
  }

  // Método para autenticar un usuario
  login(email: string, password: string): Observable<{ token: string }> {
    const url = `${this.apiUrl}/login`; // Endpoint de inicio de sesión
    const body = { email, password };
    return this.http.post<{ token: string }>(url, body);
  }

  // Método para verificar el estado de autenticación (opcional)
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  // Método para cerrar sesión (opcional)
  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Método para obtener el payload del token (opcional)
  getTokenPayload(): JwtPayload | null {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    // Decodificar el token (asegúrate de instalar la biblioteca jwt-decode)
    const decoded = this.decodeToken(token);
    return decoded;
  }

  private decodeToken(token: string): JwtPayload | null {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload)) as JwtPayload;
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
  }
}
