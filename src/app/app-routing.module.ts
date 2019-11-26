import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from './auth/auth.guard';

import { GrupoClienteEditComponent } from './grupo-cliente/edit/grupo-cliente-edit.component';
import { GrupoClienteListComponent } from './grupo-cliente/list/grupo-cliente-list.component';
import { ClienteEditComponent } from './cliente/edit/cliente-edit.component';
import { ClienteListComponent } from './cliente/list/cliente-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: 'grupo-cliente-add', component: GrupoClienteEditComponent, canActivate: [AuthGuard] },
  { path: 'grupo-cliente-edit/:id', component: GrupoClienteEditComponent, canActivate: [AuthGuard] },
  { path: 'grupo-cliente-list', component: GrupoClienteListComponent, canActivate: [AuthGuard] },
  { path: 'cliente-add', component: ClienteEditComponent, canActivate: [AuthGuard] },
  { path: 'cliente-edit/:id', component: ClienteEditComponent, canActivate: [AuthGuard] },
  { path: 'cliente-list', component: ClienteListComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
