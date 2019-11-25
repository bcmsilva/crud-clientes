import { Component, OnInit } from '@angular/core';
import { GrupoCliente } from '../shared/grupo-cliente';
import { GrupoClienteService } from '../shared/grupo-cliente.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-grupo-clientes-edit',
  templateUrl: './grupo-clientes-edit.component.html',
  styleUrls: ['./grupo-clientes-edit.component.css']
})
export class GrupoClientesEditComponent implements OnInit {
  id: string;
  // grupo: Observable<GrupoCliente>;

  formGrupo: FormGroup;

  constructor(
    private grupoClienteService: GrupoClienteService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.definirForm();

    this.id = this.route.snapshot.params['id'];

    if (this.id)
      this.carregarGrupo();
  }

  carregarGrupo() {
    this.grupoClienteService.get(this.id).subscribe(grupo => {
      this.formGrupo.controls['nome'].setValue(grupo.nome);
      this.formGrupo.controls['ativo'].setValue(grupo.ativo);
    });
  }

  definirForm() {
    this.formGrupo = this.formBuilder.group({
      ativo: this.formBuilder.control(''),
      nome: this.formBuilder.control('', Validators.required)
    });
  }

  salvar() {
    if (this.formGrupo.valid) {

      let grupo = <GrupoCliente>{
        ativo: this.formGrupo.controls['ativo'].value,
        nome: this.formGrupo.controls['nome'].value
      };

      if (!this.id) 
        this.grupoClienteService.insert(grupo);
      else 
        this.grupoClienteService.update(this.id, grupo);

      this.router.navigate(['/grupo-cliente-list']);
    }
  }
}
