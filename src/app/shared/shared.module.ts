import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header-board/header.component';
import { UserDropDown } from './UserDropDown/user-drop-down.component';

@NgModule({
  declarations: [
    HeaderComponent,
    UserDropDown
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent, // Exporta el HeaderComponent para que pueda ser utilizado en otros módulos
    UserDropDown
  ]
})
export class SharedModule {}
