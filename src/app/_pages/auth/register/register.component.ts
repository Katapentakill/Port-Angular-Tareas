import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerData = {
    email: '',
    password: ''
  };

  filePreview: string | ArrayBuffer | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Mostrar vista previa de la imagen
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.filePreview = e.target.result as string; // Asegúrate de que el resultado sea una cadena
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onRegister() {
    this.authService.register(this.registerData.email, this.registerData.password).subscribe(
      response => {
        console.log('Registration successful', response);
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/']); // Redirige al home después del registro exitoso
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }
}
