import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(public router: Router) {}

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/auth/login']);
  }

  goToUsers(): void {
    this.router.navigate(['/users']);
  }

  goToBoard(): void {
    this.router.navigate(['/board']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
