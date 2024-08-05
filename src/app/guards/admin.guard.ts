import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_pages/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getTokenPayload();
    if (user && user.role === 'Admin') {
      return true; // Permitir el acceso si el usuario es Admin
    } else {
      this.router.navigate(['/auth/login']); // Redirigir al login si no tiene acceso
      return false;
    }
  }
}
