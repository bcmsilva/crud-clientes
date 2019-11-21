import { Component, OnInit } from '@angular/core';
import { GrupoCliente } from '../shared/grupo-cliente';
import { GrupoClienteService } from '../shared/grupo-cliente.service';
import { GrupoClienteDataService } from '../shared/grupo-cliente-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grupo-clientes-list',
  templateUrl: './grupo-clientes-list.component.html',
  styleUrls: ['./grupo-clientes-list.component.css']
})
export class GrupoClientesListComponent implements OnInit {
  grupos: Observable<any>;

  constructor(
    private grupoClienteService: GrupoClienteService,
    private grupoClienteDataService: GrupoClienteDataService) { }

  ngOnInit() {
    this.grupos = this.grupoClienteService.getAll();
  }

  delete(key: string) {
    this.grupoClienteService.delete(key);
  }

  edit(grupo: GrupoCliente, key: string) {
    this.grupoClienteDataService.changeGrupoCliente(grupo, key);
  }
}
