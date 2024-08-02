import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from "../../shared/shared.module"; // Asegúrate de importar el módulo si usas HttpClient
import { ComponentsModule } from 'src/app/components/components.module';
import { TaskService } from 'src/app/services/task.service';
import { StatusService } from 'src/app/services/status.service';

@NgModule({
  declarations: [
    BoardComponent,
  ],
  imports: [
    CommonModule, // Importa CommonModule para utilizar directivas comunes como ngIf y ngFor
    HttpClientModule, // Importa HttpClientModule si necesitas realizar peticiones HTTP
    SharedModule,
    ComponentsModule
],
providers: [TaskService, StatusService],
  exports: [
    BoardComponent // Exporta BoardComponent si quieres usarlo en otros módulos
  ]
})
export class BoardModule { }
