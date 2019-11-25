import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoClienteEditComponent } from './grupo-cliente/edit/grupo-cliente-edit.component';
import { GrupoClienteListComponent } from './grupo-cliente/list/grupo-cliente-list.component';


const routes: Routes = [
  { path: 'grupo-cliente-add', component: GrupoClienteEditComponent },
  { path: 'grupo-cliente-edit/:id', component: GrupoClienteEditComponent },
  { path: 'grupo-cliente-list', component: GrupoClienteListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
