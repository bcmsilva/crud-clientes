import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GrupoCliente } from './grupo-cliente';

@Injectable({
  providedIn: 'root'
})
export class GrupoClienteDataService {
  private grupoClienteSource = new BehaviorSubject({ grupoCliente: <GrupoCliente>null, key: '' });
  currentGrupoCliente = this.grupoClienteSource.asObservable();

  constructor() { }

  changeGrupoCliente(grupoCliente: GrupoCliente, key: string) {
    this.grupoClienteSource.next({ grupoCliente: grupoCliente, key: key });
  }
}