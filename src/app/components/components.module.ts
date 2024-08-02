import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusComponent } from './StatusList/status.component';
import { ModalsModule } from '../modals/modal.module';
import { TaskComponent } from './TaskList/task.component';


@NgModule({
  declarations: [
    StatusComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalsModule
  ],
  exports: [
    StatusComponent,
    TaskComponent,
  ]
})
export class ComponentsModule { }
