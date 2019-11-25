import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgxMaskModule } from 'ngx-mask'

import { environment } from 'src/environments/environment';

import { GrupoClienteEditComponent } from './grupo-cliente/edit/grupo-cliente-edit.component';
import { GrupoClienteListComponent } from './grupo-cliente/list/grupo-cliente-list.component';
import { ClienteEditComponent } from './cliente/edit/cliente-edit.component';
import { ClienteListComponent } from './cliente/list/cliente-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GrupoClienteEditComponent,
    GrupoClienteListComponent,
    ClienteEditComponent,
    ClienteListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
