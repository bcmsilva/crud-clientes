import { Component, OnInit } from '@angular/core';
import { GrupoCliente } from '../shared/grupo-cliente';
import { GrupoClienteService } from '../shared/grupo-cliente.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-grupo-clientes-list',
  templateUrl: './grupo-clientes-list.component.html',
  styleUrls: ['./grupo-clientes-list.component.css']
})
export class GrupoClientesListComponent implements OnInit {

  formFiltrar: FormGroup;

  grupos: Observable<any>;

  constructor(
    private grupoClienteService: GrupoClienteService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.grupos = this.grupoClienteService.getAll(null);

    console.log(this.grupos);

    this.formFiltrar = this.formBuilder.group({
      nome: this.formBuilder.control(null),
      ativo: this.formBuilder.control(false),
    });
  }

  excluir(id: string) {

    if (confirm("Tem certeza que deseja excluir este registro?"))
      this.grupoClienteService.delete(id);
  }

  filtrar() {
    this.grupos = this.grupoClienteService.getAll(
      this.formFiltrar.controls['nome'].value, 
      this.formFiltrar.controls['ativo'].value);
  }
}
