import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoClientesEditComponent } from './grupo-clientes/edit/grupo-clientes-edit.component';
import { GrupoClientesListComponent } from './grupo-clientes/list/grupo-clientes-list.component';


const routes: Routes = [
  { path: 'grupo-cliente-add', component: GrupoClientesEditComponent },
  { path: 'grupo-cliente-edit/:id', component: GrupoClientesEditComponent },
  { path: 'grupo-cliente-list', component: GrupoClientesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
