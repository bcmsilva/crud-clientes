import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../shared/cliente.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  formFiltrar: FormGroup;

  clientes: Observable<any>;

  constructor(
    private clienteService: ClienteService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.clientes = this.clienteService.getAll();

    this.formFiltrar = this.formBuilder.group({
      nome: this.formBuilder.control(null),
      ativo: this.formBuilder.control(false),
    });
  }

  excluir(id: string) {

    if (confirm("Tem certeza que deseja excluir este registro?"))
      this.clienteService.delete(id);
  }

  filtrar() {
    this.clientes = this.clienteService.getAll(
      this.formFiltrar.controls['nome'].value, 
      this.formFiltrar.controls['ativo'].value);
  }
}
