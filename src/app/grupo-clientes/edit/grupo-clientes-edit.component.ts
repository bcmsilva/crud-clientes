import { Component, OnInit } from '@angular/core';
import { GrupoCliente } from '../shared/grupo-cliente';
import { GrupoClienteService } from '../shared/grupo-cliente.service';
import { GrupoClienteDataService } from '../shared/grupo-cliente-data.service';

@Component({
  selector: 'app-grupo-clientes-edit',
  templateUrl: './grupo-clientes-edit.component.html',
  styleUrls: ['./grupo-clientes-edit.component.css']
})
export class GrupoClientesEditComponent implements OnInit {
  grupoCliente: GrupoCliente;
  key: string;

  constructor(
    private grupoClienteService: GrupoClienteService,
    private grupoClienteDataService: GrupoClienteDataService) { }

  ngOnInit() {
    this.grupoCliente = new GrupoCliente();

    this.grupoClienteDataService.currentGrupoCliente.subscribe(data => {
      if(data.grupoCliente && data.key){
        this.grupoCliente = new GrupoCliente();
        this.grupoCliente.nome = data.grupoCliente.nome;
        this.grupoCliente.ativo = data.grupoCliente.ativo;
        this.key = data.key;
      }
    });
  }

  salvar() {
    if (this.key) { 
      this.grupoClienteService.update(this.grupoCliente, this.key);
    }
    else {
      this.grupoClienteService.insert(this.grupoCliente);
    }

    this.grupoCliente = new GrupoCliente();
    this.key = null;
  }
}
