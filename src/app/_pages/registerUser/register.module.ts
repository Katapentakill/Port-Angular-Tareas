import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa FormsModule
import { RegisterComponent } from './register.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { AuthService } from '../auth/auth.service';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule, // Importa CommonModule para utilizar directivas comunes como ngIf y ngFor
    HttpClientModule, // Importa HttpClientModule si necesitas realizar peticiones HTTP
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
