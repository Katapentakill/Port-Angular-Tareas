import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpEventType } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerData = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    job: '',
    curriculum: '',
    skills: '',
    expertise: ''
  };
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = '';
  errorMessage: string | undefined;

  constructor(private authService: AuthService, private userService: UserService) {}

  onRegister() {
    this.authService.register(this.registerData).subscribe(
      response => {
        console.log('Registration successful', response);
        if (this.selectedFile) {
          this.uploadUserImage(response.id);
        }
      },
      error => {
        console.error('Registration error', error);
        this.errorMessage = 'An error occurred during registration. Please try again.';
      }
    );
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadUserImage(userId: number) {
    if (this.selectedFile) {
      this.userService.uploadUserImage(userId, this.selectedFile).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            // Handle upload progress
            console.log('Upload progress:', Math.round((event.loaded / event.total!) * 100) + '%');
          } else if (event.type === HttpEventType.Response) {
            console.log('Upload successful', event.body);
          }
        },
        error => {
          console.error('Upload error', error);
          this.errorMessage = 'An error occurred while uploading the image. Please try again.';
        }
      );
    }
  }
}
