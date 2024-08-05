import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './_pages/board/board.component';
import { UsersComponent } from './_pages/users/users.component'; // Importar UsersComponent
import { RoleGuard } from './guards/admin.guard';
import { RegisterComponent } from './_pages/registerUser/register.component';

const routes: Routes = [
  { path: 'board', component: BoardComponent, data: { title: 'Gestión de tareas' }, canActivate: [RoleGuard] },
  { path: 'register', component: RegisterComponent }, // Ruta para el componente de registro
  { path: 'users', component: UsersComponent, data: { title: 'Gestión de usuarios' }, canActivate: [RoleGuard] },
  { path: 'auth', loadChildren: () => import('../app/_pages/auth/auth.module').then(m => m.AuthModule) },
  { path: '**', redirectTo: 'auth/login' } // Redireccionar cualquier ruta no existente a login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
