import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa FormsModule para usar ngModel

import { AddStatusModalComponent } from './add-status-modal/add-status-modal.component'; // Asegúrate de tener la ruta correcta
import { TaskDetailsModalComponent } from './details-task-modal/details-task-modal.component';
import { SharedModule } from '../shared/shared.module';
import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component';
import { TagSelectionModalComponent } from './details-tag-by-task-modal/details-tag-by-task-modal.component';
import { TagFunctionsComponent } from './tag-functions-modal/tag-functions-modal.component';

@NgModule({
  declarations: [
    AddStatusModalComponent, // Declara tu componente de modal aquí
    TaskDetailsModalComponent,
    AddTaskModalComponent,
    TagSelectionModalComponent,
    TagFunctionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
],
  exports: [
    AddStatusModalComponent, // Exporta el componente de modal para que se pueda usar en otros módulos
    TaskDetailsModalComponent,
    AddTaskModalComponent,
    TagSelectionModalComponent,
    TagFunctionsComponent
  ],
  providers: [
    // Puedes agregar servicios aquí si son específicos para este módulo
  ],
})
export class ModalsModule { }
