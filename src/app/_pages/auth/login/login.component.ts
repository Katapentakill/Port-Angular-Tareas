import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  errorMessage: string | null = null;  // Variable para manejar los mensajes de error

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.loginData.email, this.loginData.password).subscribe(
      response => {
        console.log('Login successful', response);
        localStorage.setItem('authToken', response.token);
        if (this.authService.isAdmin()) {
          this.router.navigate(['/board']);
        } else {
          this.errorMessage = 'No tienes acceso para realizar esta acción.';
        }
      },
      error => {
        console.error('Login failed', error);
        this.errorMessage = 'Error de inicio de sesión. Por favor, verifica tus credenciales.';
      }
    );
  }
}
