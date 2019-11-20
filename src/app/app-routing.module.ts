import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoClientesEditComponent } from './grupo-clientes/edit/grupo-clientes-edit.component';


const routes: Routes = [
  { path: 'grupo-clientes', component: GrupoClientesEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
