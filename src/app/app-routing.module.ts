import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './_pages/board/board.component';

const routes: Routes = [
  { path: '', component: BoardComponent },
  { path: 'auth', loadChildren: () => import('../app/_pages/auth/auth.module').then(m => m.AuthModule) },
  { path: '**', redirectTo: '' } // Redireccionar cualquier ruta no existente a home
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
