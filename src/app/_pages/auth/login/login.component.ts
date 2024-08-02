import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importa Router
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

  constructor(private authService: AuthService, private router: Router) {}  // Inyecta Router

  onLogin() {
    this.authService.login(this.loginData.email, this.loginData.password).subscribe(
      response => {
        console.log('Login successful', response);
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/']);  // Redirige al home
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
