import { Component, OnInit } from '@angular/core';
import { Cliente } from '../shared/cliente';
import { ClienteService } from '../shared/cliente.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GrupoClienteService } from 'src/app/grupo-cliente/shared/grupo-cliente.service';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent implements OnInit {
  id: string;
  carregando: boolean;
  formCliente: FormGroup;
  grupos: Observable<any>;

  constructor(
    private clienteService: ClienteService,
    private grupoClienteService: GrupoClienteService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.definirForm();
    this.carregarGrupos();

    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.carregando = true;
      this.carregarCliente();
    }
    else
      this.grupos.subscribe(itens => {
        if (itens && itens.length > 0)
          this.idGrupo.setValue(itens[0].id);
      });
  }

  carregarGrupos() {
    this.grupos = this.grupoClienteService.getAll(null, true, 'nome');
  }

  carregarCliente() {
    this.clienteService.get(this.id).subscribe(grupo => {
      this.carregando = false;

      this.formCliente.controls['nome'].setValue(grupo.nome);
      this.formCliente.controls['ativo'].setValue(grupo.ativo);
      this.formCliente.controls['tipoPessoa'].setValue(grupo.tipoPessoa);
      this.formCliente.controls['cpf_cnpj'].setValue(grupo.cpf_cnpj);
      this.formCliente.controls['rg_ie'].setValue(grupo.rg_ie);
      this.formCliente.controls['idGrupo'].setValue(grupo.idGrupo);
      this.formCliente.controls['telefone'].setValue(grupo.telefone);
    });
  }

  definirForm() {
    this.formCliente = this.formBuilder.group({
      ativo: this.formBuilder.control(true),
      nome: this.formBuilder.control('', Validators.required),
      tipoPessoa: this.formBuilder.control('PF', Validators.required),
      cpf_cnpj: this.formBuilder.control('', Validators.required),
      rg_ie: this.formBuilder.control(''),
      idGrupo: this.formBuilder.control(''),
      telefone: this.formBuilder.control('')
    });
  }

  salvar() {
    if (this.formCliente.valid) {

      let cliente = <Cliente>{
        ativo: this.formCliente.controls['ativo'].value,
        nome: this.formCliente.controls['nome'].value,
        tipoPessoa: this.formCliente.controls['tipoPessoa'].value,
        cpf_cnpj: this.formCliente.controls['cpf_cnpj'].value,
        rg_ie: this.formCliente.controls['rg_ie'].value,
        telefone: this.formCliente.controls['telefone'].value,
        idGrupo: this.formCliente.controls['idGrupo'].value
      };

      if (!this.id) {
        cliente.dataCadastro = new Date();
        this.clienteService.insert(cliente);
      }
      else
        this.clienteService.update(this.id, cliente);

      this.router.navigate(['/cliente-list']);
    }
    else
      this.formCliente.markAllAsTouched();
  }

  get nome() { return this.formCliente.get('nome'); }
  get cpf_cnpj() { return this.formCliente.get('cpf_cnpj'); }
  get idGrupo() { return this.formCliente.get('idGrupo'); }
  get tipoPessoa() { return this.formCliente.get('tipoPessoa'); }
}
